import { CellDto, CellPositionDto } from "../../../../dtos/cell.dto";
import CellContainer from "../cell/cell-container/cell-container.component";
import "./board.style.scss";

const defaultBoardProps: BoardProps = {
    disabled: false,
    handleShoot: () => {},
    board: []
};

function Board(props: Readonly<BoardProps>) {
    const { board, disabled = false, handleShoot } = { ...defaultBoardProps, ...props };
    function mapRow(rowOfCells: CellDto[], row: number) {
        const displayCells = rowOfCells.map((cell, column) => {
            const pos = {
                row,
                column
            };
            return (
                <td key={cell.id}>
                    <CellContainer handleShoot={handleShoot} disabled={disabled} cellProps={cell} pos={pos} />
                </td>
            );
        });

        return <tr key={rowOfCells[0].id}>{displayCells}</tr>;
    }

    function mapBoard(board: CellDto[][]) {
        const displayRows = board.map((rowOfCells, row) => {
            return mapRow(rowOfCells, row);
        });
        return <tbody key={board[0][0].id}>{displayRows}</tbody>;
    }

    const displayBoard = mapBoard(board);

    return <table className="game-board">{displayBoard}</table>;
}

export default Board;

export interface BoardProps {
    board: CellDto[][];
    disabled?: boolean;
    handleShoot?: (pos: CellPositionDto) => void;
}
