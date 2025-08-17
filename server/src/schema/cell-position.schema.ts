import { Schema } from "mongoose";
import { CellPositionModel } from "../models/cell-position.model";

export const cellPositionSchema = new Schema<CellPositionModel>({
    row: { type: Number, required: true},
    column: { type: Number, required: true}
});
