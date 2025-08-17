import { Room } from "../core/room/room";
import { PlayerInRoomRepository } from "../services/player-in-room.service";
import { RoomServiceRepository } from "../services/room.service";
import { IoWrapper } from "../wrappers/io.wrapper";
import { IdSocketRegistryHandler } from "./id-socket-registry.handler";

export class RoomRegistryHandler {
    private roomIdToRoomMap: Map<string, Room>;
    private playerIdToRoomId: Map<string, string>;
    private roomIdToPlayerIds: Map<string, string[]>;

    constructor(
        private io: IoWrapper, 
        private idSocketRegistryHandler: IdSocketRegistryHandler,
        private roomServiceRepository: RoomServiceRepository,
        private playerInRoomRepository: PlayerInRoomRepository) 
    {
        this.roomIdToRoomMap = new Map();
        this.playerIdToRoomId = new Map();
        this.roomIdToPlayerIds = new Map();
    }

    async registerRoom(room: Room) {
        this.roomIdToRoomMap.set(room.getId(), room);
        await this.roomServiceRepository.create(room);
    }

    async persistRoomState(roomId: string) {
        const room =  await this.getRoom(roomId);
        if (!room) return;

        await this.roomServiceRepository.update(room);
    }

    async unregisterRoom(roomId: string) {
        this.roomIdToRoomMap.delete(roomId);
        const playerIds = this.roomIdToPlayerIds.get(roomId) ?? [];
        playerIds.forEach(id => this.unregisterPlayer(id ,roomId));
        this.roomIdToPlayerIds.delete(roomId);
        await this.roomServiceRepository.delete(roomId);
    }

    async joinRoomSocketByPlayerId(id: string) {
        const roomId = await this.getRoomIdByPlayerId(id);
        if (!roomId) return;
        const socket = this.getSocket(id);
        if (!socket) return;
        socket.join(roomId);
    }

    async getRoomByPlayerId(playerId: string) {
        const roomId = await this.getRoomIdByPlayerId(playerId) ?? "";
        const room = await this.getRoom(roomId);
        return room;
    }

    async getRoom(roomId: string) {
        let room = this.roomIdToRoomMap.get(roomId) ?? null;
        if (!room) {
            await this.restoreRoom(roomId);
            room = this.roomIdToRoomMap.get(roomId) ?? null
        }
        return room;
    }

    async restoreRoom(roomId: string) {
        const room = await this.roomServiceRepository.get(roomId);
        room?.continueGame();
        if (room) this.registerRoom(room);

    }

    emit<TEventArgs = void>(roomId: string, ev: string, args?: TEventArgs) {
        this.io.emitToRoom(roomId, ev, args);
    }

    async registerPlayer(playerId: string, roomId: string) {
        let playerIds = await this.getPlayerIds(roomId);

        if (!playerIds) {
            playerIds = []; 
            this.setPlayerIds(roomId, playerIds);
        }
        if (playerIds.includes(playerId)) return;

        playerIds.push(playerId);
        await this.playerInRoomRepository.save(playerId, roomId);
        this.playerIdToRoomId.set(playerId, roomId);
  
    }

    async registerPlayerSockets(playerId: string, roomId: string) {
        const socket = this.getSocket(playerId);
        if (socket) {
            socket.join(roomId);
        }
    }

    async unregisterPlayer(playerId: string, roomId: string) {
        const playerIds = await this.getPlayerIds(roomId);
        if (!playerIds) return;

        await this.playerInRoomRepository.deleteByPlayerId(playerId);
        const newPlayerIds = playerIds.filter(id => id !== playerId);
        this.playerIdToRoomId.delete(playerId);
        this.setPlayerIds(roomId, newPlayerIds);

        if (newPlayerIds.length == 0) {
            await this.unregisterRoom(roomId);
        }
    }

    async getPlayerIds(roomId: string) {
        return this.roomIdToPlayerIds.get(roomId);
    }

    async getRoomIdByPlayerId(id: string) {
        let roomId = this.playerIdToRoomId.get(id);
        if (!roomId) {
            const roomModel = await this.playerInRoomRepository.get(id);
            roomId = roomModel?.roomId;
        }

        return roomId;
    }

    private getSocket(id: string) {
        return this.idSocketRegistryHandler.getSocketById(id);
    }

    private setPlayerIds(roomId: string, playerIds: string[]) {
        this.roomIdToPlayerIds.set(roomId, playerIds);
    }
}