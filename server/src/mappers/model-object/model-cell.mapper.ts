import { Cell } from "../../core/cell/cell";
import { CellModel } from "../../models/cell.model";

export function mapModelToCell(cellModel: CellModel) {
    return new Cell(cellModel.state, cellModel.id);
}
