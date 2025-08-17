import { CellPositionDto, CellState } from "../../../../../dtos/cell.dto";
import HiddenCell from "../../cell-types/hidden-cell/hidden-cell.component";
import PointedCell from "../../cell-types/pointed-cell/pointed-cell.component";
import ScorchedCell from "../../cell-types/scorched-cell/scorched-cell.component";

type OptionalCellProps = {
    state?: CellState;
    hover?: boolean;
    pos?: CellPositionDto;
    handleShoot?: (pos: CellPositionDto) => void;
    disabled?: boolean;
};

type CellProps = {
    state: CellState;
    hover: boolean;
    pos: CellPositionDto;
    handleShoot: (pos: CellPositionDto) => void;
    disabled: boolean;
};

const defaultProps: CellProps = {
    state: CellState.Hidden,
    hover: false,
    disabled: false,
    pos: {
        row: 0,
        column: 0
    },
    handleShoot: () => {}
};

function Cell(props: Readonly<OptionalCellProps>) {
    const propsToRender = { ...defaultProps, ...props };

    return <CellBasedOnState {...propsToRender} />;
}

export default Cell;

function CellBasedOnState(props: Readonly<CellProps>) {
    const { state } = props;
    switch (state) {
        case CellState.Hidden:
            return <HiddenCell {...props} />;
        case CellState.Pointed:
            return <PointedCell />;
        case CellState.Scorched:
            return <ScorchedCell />;
        default:
            return <HiddenCell {...props} />;
    }
}
