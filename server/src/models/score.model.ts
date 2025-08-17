import { Model, Schema, model } from "mongoose";

export interface Score {
    createdAt: number;
    updatedAt: number;
    playerId: string;
    score: number;
}

const scoreSchema = new Schema<Score>({
    createdAt: { type: Number, required: true, default: Date.now() },
    updatedAt: { type: Number, required: true, default: Date.now() },
    playerId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 }
});

const ScoreModel: Model<Score> = model('score', scoreSchema);

export default ScoreModel;