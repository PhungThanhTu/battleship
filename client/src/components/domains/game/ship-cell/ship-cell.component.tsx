import Skull from "../../../../assets/cute-skull.svg";
import { CellState, Color } from "../../../../dtos/cell.dto";
import { ShipDto } from "../../../../dtos/ship.dto";
import ScorchedCell from "../cell-types/scorched-cell/scorched-cell.component";
import "./ship-cell.style.scss";

export interface ShipCellProps extends ShipDto {
    cellState?: CellState;
}

const defaultProps: ShipCellProps = {
    dead: false,
    color: Color.Green,
    cellState: CellState.Hidden
};

function ShipCell(props: Readonly<ShipCellProps>) {
    const { dead, color, cellState } = { ...defaultProps, ...props };

    const shipCellDisplayClassNames = dead ? "ship-cell revealed" : "ship-cell";
    const skull = dead ? <img className="skull" src={Skull} alt="skull" /> : null;
    const scorch = cellState == CellState.Scorched && !dead ? <ScorchedCell /> : null;

    return (
        <>
            <div className={shipCellDisplayClassNames} style={{ backgroundColor: `${color}` }}></div>
            {skull}
            {scorch}
        </>
    );
}

export default ShipCell;
