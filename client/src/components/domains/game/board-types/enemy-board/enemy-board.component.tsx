import { CellDto, CellPositionDto } from "../../../../../dtos/cell.dto";
import Board from "../../board/board.component";
import './enemy-board.style.scss';

export type EnemyBoardProps = {
    board: CellDto[][];
    isTurn: boolean;
    handleShoot: (pos: CellPositionDto) => void;
};

function EnemyBoard({ board, isTurn, handleShoot }: Readonly<EnemyBoardProps>) {
    const turn = isTurn ? "turn" : "";
    const enemyTitle = isTurn ? "Attack your opponent" : "You opponent's boat";

    return (
        <div className={`enemy-board ${turn}`}>
            <div className="enemy-title">{enemyTitle}</div>
            <Board board={board} disabled={!isTurn} handleShoot={handleShoot} />
        </div>
    );
}

export default EnemyBoard;
