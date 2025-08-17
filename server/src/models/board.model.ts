import { CellModel } from "./cell.model";
import { ShipModel } from "./ship.model";


export interface BoardModel {
    ships: ShipModel[]
    cell: CellModel[][]
}

