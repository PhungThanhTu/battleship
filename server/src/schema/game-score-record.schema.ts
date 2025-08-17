import { Schema, model } from "mongoose";
import { GameScoreRecord } from "../models/game-score-record.model";
import { playerScoreRecordSchema } from "./player-score-record.schema";

const gameScoreRecordSchema = new Schema<GameScoreRecord>({
    roomId: { type: String, required: true},
    createdAt: { type: Number, required: true, default: Date.now() },
    playerScoreRecords: [playerScoreRecordSchema]
});

const GameScoreRecordModel = model('records', gameScoreRecordSchema);

export default GameScoreRecordModel;
