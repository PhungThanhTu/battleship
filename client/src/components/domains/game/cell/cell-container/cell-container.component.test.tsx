import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CellDto, CellPositionDto, CellState, Color } from "../../../../../dtos/cell.dto";
import ShipCell, { ShipCellProps } from "../../ship-cell/ship-cell.component";
import Cell from "../cell/cell.component";
import CellContainer, { CellContainerProps } from "./cell-container.component";

describe("container should based on ship and hover", () => {
    const defaultPos: CellPositionDto = {
        row: 0,
        column: 0
    };

    beforeEach(() => {
        vi.mock("../ship-cell/ship-cell.component", () => {
            const shipCell = vi.fn(() => {
                return <div>Ship cell</div>;
            });

            return {
                default: shipCell
            };
        });

        vi.mock("../cell/cell.component", () => {
            const cell = vi.fn(() => {
                return <div>cell</div>;
            });

            return {
                default: cell
            };
        });
    });

    it("should display ship cell when there is ship", () => {
        const cellProps: CellDto = {
            id: "zxczxc",
            state: CellState.Hidden,
            ship: {
                color: Color.Green,
                dead: false
            }
        };

        const cellContainerProps: CellContainerProps = {
            cellProps: cellProps,
            disabled: false,
            handleShoot: () => {},
            pos: defaultPos
        };

        const expectedShipCellProps: ShipCellProps & CellContainerProps = {
            cellState: cellProps.state,
            color: cellProps.ship?.color,
            dead: cellProps.ship?.dead,
            ...cellContainerProps
        };

        render(<CellContainer {...cellContainerProps} />);

        expect(ShipCell).toBeCalledWith(expectedShipCellProps, {});
    });

    it("should display hovered cell", () => {
        const cellProps: CellDto = {
            id: "zxxzczx",
            state: CellState.Hidden,
            ship: null
        };

        const { container } = render(<CellContainer pos={defaultPos} cellProps={cellProps} disabled handleShoot={() => {}} />);
        const cellContainer = container.querySelector(".cell-container");
        if (cellContainer) fireEvent.mouseEnter(cellContainer);
        expect(ShipCell).not.toBeCalled();
        expect(Cell).toBeCalledWith(
            expect.objectContaining({
                state: cellProps.state,
                hover: true
            }),
            {}
        );
    });

    it("should display non-hovered cell", () => {
        const cellProps: CellDto = {
            id: "zxczxc",
            state: CellState.Hidden,
            ship: null
        };

        const { container } = render(<CellContainer pos={defaultPos} disabled cellProps={cellProps} />);
        const cellContainer = container.querySelector(".cell-container");
        if (cellContainer) fireEvent.mouseLeave(cellContainer);
        expect(ShipCell).not.toBeCalled();
        expect(Cell).toBeCalledWith(
            expect.objectContaining({
                state: cellProps.state,
                hover: false
            }),
            {}
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
});
