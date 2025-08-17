import React, { useState } from "react";
import { CellDto, CellPositionDto, CellState } from "../../../../../dtos/cell.dto";
import ShipCell from "../../ship-cell/ship-cell.component";
import Cell from "../cell/cell.component";
import "./cell-container.style.scss";

export type CellContainerProps = {
    cellProps: CellDto;
    disabled: boolean;
    handleShoot?: (pos: CellPositionDto) => void;
    pos: CellPositionDto;
};

const CellContainer = React.memo(function CellContainer(props: Readonly<CellContainerProps>) {
    const { ship, state } = props.cellProps;
    const { handleShoot, pos } = props;
    const [isHover, setIsHover] = useState<boolean>(false);

    function onClick() {
        if (handleShoot && !ship && state == CellState.Hidden) handleShoot(pos);
    }

    function mouseEnter() {
        setIsHover(true);
    }

    function onMouseLeave() {
        setIsHover(false);
    }

    const cellDisplay = ship ? <ShipCell cellState={state} {...ship} {...props} /> : <Cell state={state} hover={isHover} {...props} />;

    return (
        <div onClick={onClick} onMouseEnter={mouseEnter} onMouseLeave={onMouseLeave} role="none" className="cell-container">
            {cellDisplay}
        </div>
    );
});

export default CellContainer;
