import { GameServerContext } from "../../contexts/game-server.context";
import { RoomJoinRequestDto } from "../../dtos/room.dto";
import { IoWrapper } from "../../wrappers/io.wrapper";
import { SocketWrapper } from "../../wrappers/socket.wrapper";
import { createRoom } from "../room/room";
import "../../extensions/socket-custom-id.extension";
import "../../extensions/io-event.extensions";
import { RoomEvents, RoomServerEvent } from "../../enums/room-event.enum";

const MAX_ROOM_PLAYER_COUNT = 2;

export class Pool {

    constructor(private context: GameServerContext) {}

    initializeBaseEventsForIo(io: IoWrapper) {
        io.subscribeConnect(async (socket) => await this.handlePlayerConenct(socket));
    }

    private async handlePlayerConenct(socket: SocketWrapper) {
        const id = socket.getId();
        console.log('socket connected ', socket.getSocketId());
        const events = this.context.getIdEventRegistry().getEventsById(id);
        if (!events) {
            this.subscribeNewPlayerEvent(id);
        }
        this.context.getIdEventRegistry().syncSocket(socket);
        this.context.getIdEventRegistry().syncEventWithSocket(socket);
    }


    private subscribeNewPlayerEvent(playerId: string) {
        this.subscribeCreateRoomEventForPlayer(playerId);
        this.subscribeJoinRoomEventForPlayer(playerId);
    }

    private subscribeCreateRoomEventForPlayer(playerId: string) {
        this.context
            .getIdEventRegistry()
            .subscribe<undefined>(playerId, {
                event: RoomEvents.CREATE,
                handle: async () => await this.handleCreateRoom(playerId)
            });
    }


    private subscribeJoinRoomEventForPlayer(playerId: string) {
        this.context
            .getIdEventRegistry()
            .subscribe<RoomJoinRequestDto>(playerId, {
                event: RoomEvents.JOIN,
                handle: async (data) => await this.handleJoinRoom(playerId, data)
            });
    }

    private async handleCreateRoom(playerId: string) {
        let roomId = 
            await this.context.getRoomRegistry()
            .getRoomIdByPlayerId(playerId);
        
        if (!roomId) roomId = await this.createRoomAndGetId();
        this.context.getIdSocketRegistry()
            .emit(playerId,
                RoomServerEvent.ROOM_CREATED, 
                { roomId });
    }

    private async handleJoinRoom(playerId: string, request?: RoomJoinRequestDto) {
        try {
            await this.tryHandleJoinRoom(playerId, request);
        } catch (err) {
            let message = "unknown message";
            if (err instanceof Error) message = err.message;
            this
                .context
                .getIdSocketRegistry()
                .emit(playerId, RoomServerEvent.ROOM_ERROR, {
                    message
                });
        }
    }

    private async tryHandleJoinRoom(playerId: string, request?: RoomJoinRequestDto) {
        const roomId = request?.roomId ?? "";
        const roomRegistry = this.context.getRoomRegistry();
        let room = await roomRegistry.getRoom(roomId);
   
        if (!room) throw new Error("Room not found");
        const ids = await roomRegistry.getPlayerIds(roomId);
        if (ids && !ids.includes(playerId) && ids.length >= MAX_ROOM_PLAYER_COUNT)
        {
            throw new Error("Room full");
        }

        await room.join(playerId);
    }

    private async createRoomAndGetId() {
        const room = createRoom(this.context);
        await this.context.getRoomRegistry().registerRoom(room);
        return room.getId();
    }
}