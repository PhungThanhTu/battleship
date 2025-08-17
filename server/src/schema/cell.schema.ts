import { Schema } from "mongoose";
import { CellModel } from "../models/cell.model";

export const cellSchema = new Schema<CellModel>({
    id: { type: String, required: true},
    state: { type: String, required: true}
})