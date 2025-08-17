import { Schema } from "mongoose";
import { PlayerScoreRecord } from "../models/player-score-record.model";

export const playerScoreRecordSchema = new Schema<PlayerScoreRecord>({
    playerId: { type: String, required: true},
    delta: { type: Number, required: true, default: 0},
    newScore: { type: Number, required: true, default: 0 }
});
