import { PERSIST_ROOM } from "../configuration";
import { GameServerContext } from "../contexts/game-server.context";
import { Room } from "../core/room/room";
import { RoomState } from "../dtos/room.dto";
import { mapModelToRoom } from "../mappers/model-object/model-room.mapper";
import { mapRoomToModel } from "../mappers/object-model/room-model.mapper";
import { RoomModel } from "../models/room.model";
import RoomDataModel from "../schema/room.schema";

export class RoomServiceRepository {

    private context: GameServerContext | null;

    constructor() {
        this.context = null;
    }

    setContext(context: GameServerContext) {
        this.context = context;
    }

    async create(room: Room) {
        if (!PERSIST_ROOM) return;
    
        const roomModel = new RoomDataModel(mapRoomToModel(room));
        
        await roomModel.save();
    }    

    async get(id: string): Promise<Room | null> {
        if (!this.context) throw new Error("No context, please inject context to the service repository using setContext");
        if (!PERSIST_ROOM) return null;

        const roomModel = await RoomDataModel.findOne<RoomModel>({
            id,
            state: {
                $ne: RoomState.Ended
            }
        }).exec();

        const room = roomModel
            ? mapModelToRoom(roomModel, this.context)
            : null;
        
        return room;
    }

    async update(room: Room): Promise<void> {
        if (!PERSIST_ROOM) return;

        const updatedRoomModel = mapRoomToModel(room);

        await RoomDataModel.updateOne({
            id: updatedRoomModel.id
        }, updatedRoomModel);
    }

    async delete(id: string) {
        await RoomDataModel.deleteOne({
            id
        });
    }
}