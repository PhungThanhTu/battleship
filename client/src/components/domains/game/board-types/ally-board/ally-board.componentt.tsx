import { CellDto } from "../../../../../dtos/cell.dto";
import Board from "../../board/board.component";
import "./ally-board.style.scss";

export type AllyBoardProps = {
    board: CellDto[][];
    isTurn: boolean;
};

function AllyBoard({ board, isTurn }: Readonly<AllyBoardProps>) {
    const turn = isTurn ? "turn" : "";

    return (
        <div className={`ally-board ${turn}`}>
            <div className="ally-title">Your ships</div>
            <Board board={board} disabled />
        </div>
    );
}

export default AllyBoard;
