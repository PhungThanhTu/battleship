import { Schema } from "mongoose";
import { BoardModel } from "../models/board.model";
import { cellSchema } from "./cell.schema";
import { shipSchema } from "./ship.schema";
export const boardSchema = new Schema<BoardModel>({
    ships: { required: true, default: [], type: [shipSchema]},
    cell: { required: true, default: [], type: [[cellSchema]]}
});