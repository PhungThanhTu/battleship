import { Cell } from "../../core/cell/cell";
import { CellModel } from "../../models/cell.model";

export function mapCellToModel(cell: Cell): CellModel {
    return {
        id: cell.getId(),
        state: cell.getState()
    }
}
