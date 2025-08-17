import { Player, createPlayer } from "../player/player";
import { TurnManager, createTurnManager } from "../turn-manager/turn-manager";
import { GameStateDto, ShootRequestDto } from "../../dtos/game.dto";
import { EventSubscription } from "../../shared/events/event";
import { GameResult, storeScoreRecordAndUpdateScoreUsingDefaultSetting } from "../../services/score-record.service";
import { GameServerContext } from "../../contexts/game-server.context";


export function createGame(context: GameServerContext, players: Player[] = [], turnManager: TurnManager | null = null): Game {
    return new GameImpl(context, players, turnManager);
}

export type Game = InstanceType <typeof GameImpl>

class GameImpl {
    private players: Player[];
    private context: GameServerContext;
    private turnManager: TurnManager | null;
    private winnerId: string | null;

    constructor(context: GameServerContext, players: Player[] = [], turnManager: TurnManager | null = null) {
        this.players = [];
        this.context = context;
        this.players = players;
        this.turnManager = turnManager;
        this.winnerId = null;
    }

    getPlayers() {
        return this.players;
    }

    getTurnManager() {
        return this.turnManager;
    }

    addPlayers(playerIds: string[]) {
        if (playerIds) {
            playerIds.forEach(playerId => this.createAndAddPlayer(playerId));
        }
        this.turnManager = createTurnManager(playerIds);
    }

    getWinnerId() {
        return this.winnerId;
    }

    subscribeAllPlayerEvents() {
        this.players.forEach((player) => this.subscribePlayerEvents(player.getId()));
    }

    dispose() {
        this.unsubscribeAllGameEventsForAllPlayers();
    }
    
    async handlePlayerResign(playerId: string) {
        const playerEnemy = this.getPlayerEnemies(playerId)[0];
                this.winnerId = playerEnemy.getId();
                const room = await this.getRoom();
                if (!room) return;
                room.notifyRoomMessageByPlayer(playerId, `player ${playerId} resigned`);
                await this.endGame();
    }

    private createAndAddPlayer(playerId: string) {
        let player = this.players.find(p => p.getId() === playerId);
        if (!player) { 
            player = createPlayer(playerId);
            this.players.push(player);
        }
    }

    private subscribePlayerEvents(playerId: string) {
        this.subscribePlayerSyncEvent(playerId);
        this.subScribePlayerShootEvent(playerId);
        this.suscribePlayerResignEvent(playerId);
    }

    private subScribePlayerShootEvent(playerId: string) {
        const shootEvent: EventSubscription<ShootRequestDto> = {
            event: GameEvent.SHOOT,
            handle: async (data) => {
                if (!data) return;
                if (!this.turnManager) return;
                if (!this.turnManager.isPlayerTurn(playerId)) return;

                const playerEnemy = this.getPlayerEnemies(playerId)[0];

                playerEnemy.takeShot(data);
                
                if (!playerEnemy.mustContinueTakingShot(data)) this.turnManager.goNextTurn();
                if (playerEnemy.isLost()) {
                    console.log("end game bro, ", playerId, " win");
                    this.winnerId = playerId;
                    await this.endGame();
                }

                const room = await this.getRoom();
                await room?.persistCurrentState();

                return this.notifyStateToAllPlayers();
            } 
        }

        this.context.getIdEventRegistry().subscribe(playerId, shootEvent);
    }

    private suscribePlayerResignEvent(playerId: string) {
        const resignEvent: EventSubscription = {
            event: GameEvent.RESIGN,
            handle: async () => await this.handlePlayerResign(playerId)
        }

        this.context.getIdEventRegistry().subscribe(playerId, resignEvent);
    }


    private async endGame() {
        if (!this.winnerId) return;
        const roomId = await this.context.getRoomRegistry().getRoomIdByPlayerId(this.winnerId) ?? "";
        const room = await this.getRoom();
        if (!room) return;
        
        const winnerId = this.winnerId;
        const playerIds = this.players.map(player => player.getId());

        const gameResult: GameResult = {
            roomId,
            winnerId,
            playerIds
        }

        await storeScoreRecordAndUpdateScoreUsingDefaultSetting(gameResult);
        await room.endRoom();
        this.notifyStateToAllPlayers();
        this.unsubscribeAllGameEventsForAllPlayers();
    }

    private async getRoom() {
        const roomId = await this.context.getRoomRegistry().getRoomIdByPlayerId(this.players[0].getId()) ?? "";
        return await this.context.getRoomRegistry().getRoom(roomId);
    }

    private subscribePlayerSyncEvent(playerId: string) {

        const syncEvent: EventSubscription = {
            event: GameEvent.SYNC,
            handle: () => {
                this.notifyGameStateToPlayer(playerId);
            }
        }

        this.context.getIdEventRegistry().subscribe(playerId, syncEvent);
    }

    private getPlayerEnemies(playerId: string) {
        return this.players.filter(player => player.getId() !== playerId);
    }

    private notifyStateToAllPlayers() {
        this.players.forEach(player => this.notifyGameStateToPlayer(player.getId()));
    }

    private notifyGameStateToPlayer(playerId: string) {
        const player = this.players.find(player => player.getId() === playerId);

        if(!player) return;
        const gameState = this.getGameState(player);
        this.context
            .getIdSocketRegistry()
            .emit<GameStateDto>(playerId, GameServerEvent.FETCH_GAME_STATE, gameState);
    }

    private getGameState(player: Player): GameStateDto {
        const playerId = player.getId();
        const enemies = 
            this.players
            .filter(curPlayer => curPlayer.getId() !== playerId)
            .map(curPlayer => curPlayer.getBoardStateAsEnemy());
        const allies = 
            this.players
            .filter(curPlayer => curPlayer.getId() === playerId)
            .map(curPlayer => curPlayer.getBoardStateAsAlly());
            
        const isTurn = this.turnManager?.isPlayerTurn(playerId) ?? false;

        const gameState = {
            enemies,
            allies,
            isTurn
        }

        return gameState;
    }

    private unsubscribeAllGameEventsForAllPlayers() {
        this.players.forEach((player) => this.unsubscribeAllGameEventsForPlayer(player.getId()));
    }

    private unsubscribeAllGameEventsForPlayer(playerId: string) {
        Object.values(GameEvent).forEach(event => this.context.getIdEventRegistry().unsubscribe(playerId, event));
    }
}


enum GameEvent {
    SYNC = "game_sync",
    SHOOT = "game_shoot",
    RESIGN = "game_resign"
}

enum GameServerEvent {
    FETCH_GAME_STATE = "game_fetch",
    FINALIZE_GAME = "game_finalize"
}