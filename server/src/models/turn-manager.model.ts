import { Schema } from "mongoose";

export interface TurnManagerModel {
    players: string[],
    currentTurn: number;
}

export const turnManagerSchema = new Schema<TurnManagerModel>({
    players: { type: [String], required: true },
    currentTurn: { type: Number }
});
