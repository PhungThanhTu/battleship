import { Schema } from "mongoose";
import { PlayerModel } from "../models/player.model";
import { boardSchema } from "./board.schema";

export const playerSchema = new Schema<PlayerModel>({
    id: { type: String, required: true },
    board: { type: boardSchema, required: true }
});