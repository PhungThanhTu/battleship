import { Schema, Model, model } from "mongoose";
import { RoomModel } from "../models/room.model";
import { memberSchema } from "./member.schema";
import { gameSchema } from "./game.schema";

const roomSchema = new Schema<RoomModel>({
    id: { type: String, required: true },
    members: { type: [memberSchema], required: true },
    state: { type: String, required: true },
    game: { type: gameSchema, required: false, default: null }
});

const RoomDataModel: Model<RoomModel> = model('room', roomSchema);

export default RoomDataModel;
