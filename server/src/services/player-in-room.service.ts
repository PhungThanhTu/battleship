import { PERSIST_ROOM } from "../configuration";
import PlayerInRoomDataModel from "../schema/player-in-room.schema";


export class PlayerInRoomRepository {
    async save(playerId: string, roomId: string) {
        if (!PERSIST_ROOM) return;
        
        const playerInRoom = {
            playerId,
            roomId
        };
        const playerInRoomDataModel = new PlayerInRoomDataModel(playerInRoom);
    
        await playerInRoomDataModel.save();    
    }

    async get(playerId: string) {
        return await PlayerInRoomDataModel.findOne({
            playerId
        }).exec();    
    }

    async deleteByPlayerId(playerId: string) {
        await PlayerInRoomDataModel.deleteMany({
            playerId
        });    
    }

    async deleteByRoomId(roomId: string) {
        await PlayerInRoomDataModel.deleteMany({
            roomId
        });
    
    }
}