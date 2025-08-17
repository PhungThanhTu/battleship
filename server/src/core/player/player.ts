import { ShootRequestDto } from "../../dtos/game.dto";
import { renderEnemyBoard, renderAllyBoard } from "../board-mapper/board-mapper";
import { Board, createBoard } from "../board/board";

export function createPlayer(playerId: string, board?: Board) {
    return new PlayerImpl(playerId, board);
}

export type Player = InstanceType <typeof PlayerImpl>

class PlayerImpl {
    private id: string;
    private board: Board;

    constructor(playerId: string, board?: Board) {
        this.id = playerId;
        this.board = board ?? createBoard();

    }

    getBoard() {
        return this.board;
    }

    takeShot(pos: ShootRequestDto) {
        this.board.shoot(pos);
    }

    mustContinueTakingShot(pos: ShootRequestDto) {
        const ship = this.board.getShip(pos);
        if (!ship) return false;
        if (ship.isDead()) return false;

        return true;
    }

    isLost() {
        return this.board.isLost();
    }

    getId() {
        return this.id;
    }

    getBoardStateAsEnemy() {
        return renderEnemyBoard(this.board);
    }

    getBoardStateAsAlly() {
        return renderAllyBoard(this.board);    
    }
}