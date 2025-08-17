import { Game, createGame } from "../game/game";
import { RoomEndResponseDto, RoomFetchResponseDto, RoomMemberState, RoomNotificationResponseDto, RoomState } from "../../dtos/room.dto";
import { EventSubscription } from "../../shared/events/event";
import { GameServerContext } from "../../contexts/game-server.context";
import { RoomEvents, RoomServerEvent, RoomTimedEvents } from "../../enums/room-event.enum";
import { getNanoid } from "../../utils/id";
const ROOM_ID_LENGTH = 5;
const NUM_PLAYER_PER_ROOM = 2;

const ROOM_DISCONNECTION_THRESHOLD = 10000;

export function createRoom(context: GameServerContext,id? : string, members?: RoomMember[], state = RoomState.Waiting, game: Game | null = null): Room {
    return new RoomImpl(context, id, members, state, game);
}

export type Room = InstanceType<typeof RoomImpl>

export type RoomMember = {
    playerId: string;
    state: RoomMemberState 
}

class RoomImpl {
    private id: string;
    private members: RoomMember[];
    private state: RoomState;
    private game: Game | null;
    private context: GameServerContext;

    constructor(context: GameServerContext,id? : string, members?: RoomMember[], state = RoomState.Waiting, game: Game | null = null) {
        this.context = context;
        this.id = id ?? generateId();
        this.members = members ?? [];
        this.state = state;
        this.game = game;
    }

    continueGame() {
        this.members.forEach((member) => this.subscribeMemberEvent(member.playerId));
        
        if (this.game && this.isAllMemberReady()) {
            this.game.subscribeAllPlayerEvents();
        }
    }

    getMembers() {
        return this.members;
    }

    async join(playerId: string) {
        console.log('player ', playerId, ' joined');
        const roomRegistry = this.context.getRoomRegistry();
        const isNewPlayer = await this.addMemberToRoomAndReturnWhetherPlayerAdded(playerId);
        await roomRegistry.joinRoomSocketByPlayerId(playerId);
        await this.persistCurrentState();
        await this.notifyTheRoomToFetchRoom();
        if (isNewPlayer) return await this.notifyPlayerJoined(playerId);
        await this.context.getPlayerIdBasedTimedEventHandler().cancelTimer(playerId, RoomTimedEvents.LONG_DISCONNECTION);
        return await this.notifyPlayerReconnect(playerId);
    }

    getId() {
        return this.id;
    }

    async endRoom() {
        const winnerId = this.game?.getWinnerId();
        if (!winnerId) return;
        this.setState(RoomState.Ended);
        await this.persistCurrentState();
        this.notifyAllMembersToEndRoom(winnerId);
        await this.dispose();
    }

    async dispose() {
        this.unsubscribeAllMembersEvents();
        this.game?.dispose();
        await this.context.getRoomRegistry().unregisterRoom(this.getId());
    }

    getGame() {
        return this.game;
    }

    
    getState() {
        return this.state;
    }    

    private isPlayerInRoom(playerId: string) {
        return this.members.find(member => member.playerId === playerId);
    }

    async persistCurrentState() {
        await this.context.getRoomRegistry().persistRoomState(this.id);
    }

    private unsubscribeAllMembersEvents() {
        this.members.forEach((member) => this.unsubscribeMemberEvents(member.playerId));
    }

    private unsubscribeMemberEvents(playerId: string) {
        this.context.getIdEventRegistry().unsubscribe(playerId, RoomEvents.READY);
        this.context.getIdEventRegistry().unsubscribe(playerId, RoomEvents.QUIT);
        this.context.getIdEventRegistry().unsubscribe(playerId, "disconnect");
    }

    private subscribeMemberReadyEvent(playerId: string) {
        const memberReadyEvent: EventSubscription = {
            event: RoomEvents.READY,
            handle: async () => await this.handleMemberReady(playerId)
        }

        this.context.getIdEventRegistry().subscribe(playerId, memberReadyEvent);
    }

    private subscribeMemberQuitEvent(playerId: string) {
        const memberQuitEvent: EventSubscription = {
            event: RoomEvents.QUIT,
            handle: async () => {
                await this.handlePlayerQuit(playerId);
                if (this.members.length === 0) {
                    await this.dispose();
                }
            }
        }

        this.context.getIdEventRegistry().subscribe(playerId, memberQuitEvent);
    }
    
    private async handleMemberReady(playerId: string) {
        const member = this.members.find(member => member.playerId === playerId);
        if (!member) return;
        if (this.state == RoomState.Started) return;
        
        member.state = RoomMemberState.Ready;
        if (this.isFull() && this.isAllMemberReady()) await this.startGame();
        await this.notifyTheRoomToFetchRoom();
    }

    private isAllMemberReady() {
        return this.members.every(member => member.state === RoomMemberState.Ready);
    }

    private async startGame() {
        this.state = RoomState.Started;
        const playerIds = this.members.map(member => member.playerId);
        this.game = createGame(this.context);
        this.game.addPlayers(playerIds);
        this.game.subscribeAllPlayerEvents();
        await this.persistCurrentState();
    }

    private async notifyTheRoomToFetchRoom() {
        const state = this.getState();
        const roomId = this.getId();
        const winnerId = this.game?.getWinnerId() ?? "";
        const members = this.members;
        this
            .context
            .getRoomRegistry()
            .emit<RoomFetchResponseDto>(this.getId(),RoomServerEvent.ROOM_FETCH, {
                state,
                roomId,
                winnerId,
                members
            });
    }

    private async notifyPlayerQuit(playerId: string) {
        await this.notifyRoomMessageByPlayer(playerId, `player ${playerId} has quit`);
    }

    private async notifyPlayerReconnect(playerId: string) {
        await this.notifyRoomMessageByPlayer(playerId, `player ${playerId} has reconnected`);
    }
    
    private async notifyPlayerJoined(playerId: string) {
        await this.notifyRoomMessageByPlayer(playerId, `player ${playerId} has joined`);
    }

    private notifyAllMembersToEndRoom(winnerId: string) {
        this.context.getRoomRegistry().emit<RoomEndResponseDto>(this.getId(),
        RoomServerEvent.ROOM_END, {
            state: this.getState(),
            winnerId
        });
    }
    
    private isFull() {
        return this.members.length >= NUM_PLAYER_PER_ROOM;
    }

    private setState(state: RoomState) {
        this.state = state;
    }

    private async addMemberToRoomAndReturnWhetherPlayerAdded(playerId: string) {
        if (this.isPlayerInRoom(playerId)) return 0;
        
        const newMember: RoomMember = {
            playerId,
            state: RoomMemberState.Waiting            
        }

        this.members.push(newMember);    

        const roomRegistry = this.context.getRoomRegistry();
        await roomRegistry.registerPlayer(playerId, this.getId());
        this.subscribeMemberEvent(playerId);
        return 1;
    }

    private subscribeMemberEvent(playerId: string) {
        this.subscribeMemberReadyEvent(playerId);
        this.subscribeMemberQuitEvent(playerId);
        this.subcribeDisconnectEventForPlayer(playerId);
    }

    private async handlePlayerQuit(playerId: string) {
        this.members = this.members.filter(member => member.playerId !== playerId);
        await this.context.getRoomRegistry().unregisterPlayer(playerId, this.id);
        await this.persistCurrentState();
        await this.notifyTheRoomToFetchRoom();
        await this.notifyPlayerQuit(playerId);
    }
    
    async notifyRoomMessageByPlayer(playerId: string, message: string) {
        this
        .context
        .getIdSocketRegistry()
        .emitBoardcast<RoomNotificationResponseDto>(playerId, this.getId(), RoomServerEvent.ROOM_NOTIFICATION, {
            message
        });

    }
    
    async notifyRoomMessageToRoom(message: string) {
        this
        .context
        .getRoomRegistry()
        .emit<RoomNotificationResponseDto>(this.getId(), RoomServerEvent.ROOM_NOTIFICATION, {
            message
        });

    }

    private subcribeDisconnectEventForPlayer(playerId: string) {
        this.context
        .getIdEventRegistry()
        .subscribe(playerId, {
            event: "disconnect",
            handle: async () => {
                await this.handlePlayerDisconnect(playerId);
            }
        });
    
    }

    async handlePlayerDisconnect(playerId: string) {
        const member = this.members.find(foundMember => foundMember.playerId === playerId);
        if (member) member.state = RoomMemberState.Waiting;
        await this.notifyTheRoomToFetchRoom();
        await this.persistCurrentState();
        if (this.isPlayerInRoom(playerId)) { 
            this.quitLater(playerId);
            await this.notifyRoomMessageToRoom(`player ${playerId} disconnected`);
        }
    }

    private quitLater(playerId: string) {
        const timedEventHandler = this.context.getPlayerIdBasedTimedEventHandler();
        timedEventHandler.registerEventTimer(playerId, {
            event: RoomTimedEvents.LONG_DISCONNECTION,
            handle: async () => {
                if (this.game) {
                    await this.game.handlePlayerResign(playerId);
                    return await this.notifyRoomMessageToRoom(`player ${playerId} lost due to long disconnection`);
                }
                await this.handlePlayerQuit(playerId);
                return await this.notifyRoomMessageToRoom(`player ${playerId} quit due to long disconnection`);
            }
        },ROOM_DISCONNECTION_THRESHOLD);
    }


}

function generateId() {
    return getNanoid(ROOM_ID_LENGTH);
}
