import { Schema } from "mongoose";
import { ShipModel } from "../models/ship.model";
import { cellPositionSchema } from "./cell-position.schema";

export const shipSchema = new Schema<ShipModel>({
    id: { type: String, required: true},
    color: { type: String, required: true},
    currentCellCount: { type: Number, required: true},
    cellPositions: { type: [cellPositionSchema], required: true }
});