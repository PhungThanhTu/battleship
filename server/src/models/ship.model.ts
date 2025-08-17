import { Color } from "../utils/color";
import { CellPositionModel } from "./cell-position.model";

export interface ShipModel {
    id: string;
    color: Color;
    currentCellCount: number;
    cellPositions: CellPositionModel[]; 
}
