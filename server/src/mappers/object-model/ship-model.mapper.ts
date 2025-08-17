import { Ship } from "../../core/ship/ship";
import { CellPositionModel } from "../../models/cell-position.model";
import { ShipModel } from "../../models/ship.model";

export function mapShipToModel(ship: Ship, cellPositions: CellPositionModel[] = []): ShipModel {
    const id = ship.getId();
    const color = ship.getColor();
    const currentCellCount = ship.getCurrentCellCount();

    const shipModel = {
        id,
        color,
        cellPositions,
        currentCellCount
    }

    return shipModel;
}