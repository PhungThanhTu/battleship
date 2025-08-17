import { Cell } from "../cell/cell";
import { Board } from "../board/board";
import { Ship } from "../ship/ship";
import { CellDto } from "../../dtos/cell.dto";
import { ShipDto } from "../../dtos/ship.dto";

export const renderAllyBoard = (board: Board) => mapBoardToDto(board, true);
export const renderEnemyBoard = (board: Board) => mapBoardToDto(board, false);


function mapBoardToDto(board: Board, isAlly: boolean) {
    const matrix = board.getMatrix();
    return matrix.map((row) => (row.map((cell) => mapCellToDto(cell, isAlly))));
}

function mapCellToDto(cell: Cell, isAlly: boolean): CellDto {
    const ship = mapShipToDto(cell.getShip(), isAlly);

    return {
        id: cell.getId(),
        state: cell.getState(),
        ship
    }
}

function mapShipToDto(ship: Ship | null, isAlly: boolean): ShipDto | null {
    if (!ship) return null;
    if (!(isAlly || ship.isDead())) return null; // we won't show living ship to enemy
    
    return {
        color: ship.getColor(),
        dead: ship.isDead()
    }
}