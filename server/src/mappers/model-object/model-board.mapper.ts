import { Board, createBoard } from "../../core/board/board";
import { Cell } from "../../core/cell/cell";
import { Ship } from "../../core/ship/ship";
import { BoardModel } from "../../models/board.model";
import { mapModelToCell } from "./model-cell.mapper";

export function mapModelToBoard(boardModel: BoardModel): Board {
    const shipModels = boardModel.ships;
    const cellModels = boardModel.cell; 

    const cells = cellModels.map(
        (cellRow) => cellRow.map(cell => mapModelToCell(cell)));


    const ships: Ship[] = []
    shipModels.forEach(shipModel => {
        const cellsHoldShip: Cell[] = [];
        const { id, currentCellCount, color, cellPositions } = shipModel;
        cellPositions.forEach(cellPos => {
            const { row, column } = cellPos;
            cellsHoldShip.push(cells[row][column]);

        });

        const ship = new Ship({ 
            color, 
            id, 
            currentCellCount, 
            cells: cellsHoldShip 
        });

        ships.push(ship);
    });

    const board = createBoard(cells);
    board.placeShips(ships);

    return board;
}
