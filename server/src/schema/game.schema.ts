import { Schema } from "mongoose";
import { GameModel } from "../models/game.model";
import { turnManagerSchema } from "../models/turn-manager.model";
import { playerSchema } from "./player.schema";

export const gameSchema = new Schema<GameModel>({
    players: { type: [playerSchema] },
    turnManager: { type: turnManagerSchema }
});