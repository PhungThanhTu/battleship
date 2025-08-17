import { Board } from "../../core/board/board";
import { BoardModel } from "../../models/board.model";
import { CellModel } from "../../models/cell.model";
import { ShipModel } from "../../models/ship.model";
import { mapCellToModel } from "./cell-model.mapper";
import { mapShipToModel } from "./ship-model.mapper";

export function mapBoardToModel(board: Board): BoardModel {

    const shipModelsMap: Map<string,ShipModel> = new Map();
    const visitedShipCells = new Set<string>();
    
    const cells = createCellModels();
    
    return {
        cell: cells,
        ships: Array.from(shipModelsMap.values())
    }

    function createCellModels() {
        
        const ROWS = board.getHeight();
        const cellModels: CellModel[][] = [];
        for (let row = 0; row < ROWS; row+= 1) {
            const newCellModelsRow = createCellModelsRow(row);
    
            cellModels.push(newCellModelsRow);
        }

        return cellModels;
    }

    function createCellModelsRow(row: number) {
        const COLUMNS = board.getWidth();        
        const newCellModelsRow = [];
        for (let column = 0; column < COLUMNS; column += 1) {
            const cell = getCell(row, column);
            newCellModelsRow.push(mapCellToModel(cell));
            dfs(row, column);
        }
        
        return newCellModelsRow;
    }

    function dfs(row: number, column: number) {
        if (isPositionOutsideTheBoard(row, column)) return;
        if (isCellVisited(row, column)) return;

        markCellAsVisited(row, column);

        const ship = getShip(row, column);

        if (!ship) return;

        const id = ship.getId();
        
        let shipModel: ShipModel | undefined = shipModelsMap.get(id);
        
        if (!shipModel) {
            shipModel = mapShipToModel(ship, []);
            shipModelsMap.set(id, shipModel)
        }

        shipModel.cellPositions.push({
            row,
            column
        });

        dfs(row - 1, column);
        dfs(row + 1, column);
        dfs(row, column - 1);
        dfs(row, column + 1);
    }

    function isPositionOutsideTheBoard(row: number, column: number) {
        return row < 0 || row >= board.getHeight() || column < 0 || column >=board.getWidth();
    }
    
    function isCellVisited(row: number, column: number) {
        return visitedShipCells.has(getPositionHash(row, column));
    }

    function markCellAsVisited(row: number, column: number) {
        visitedShipCells.add(getPositionHash(row, column));
    }

    function getShip(row: number, column: number) {
        return getCell(row,column).getShip();
    }

    function getCell(row: number, column: number) {
        return board.getCell({
            row,
            column
        });
    }

    function getPositionHash(row: number, col: number) {
        return `${row}-${col}`;
    }    
}
