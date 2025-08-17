import { Schema, Model, model } from "mongoose";
import { PlayerInRoomModel } from "../models/player-in-room.model";

export const playerInRoomSchema = new Schema<PlayerInRoomModel>({
    playerId: { type: String, required: true },
    roomId: { type: String, required: true },
});

const PlayerInRoomDataModel = Model<PlayerInRoomModel> = model('playerinroom', playerInRoomSchema);

export default PlayerInRoomDataModel;