import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Cell from "./cell.component";

import "@testing-library/jest-dom/vitest";
import { CellState } from "../../../../../dtos/cell.dto";
import HiddenCell from "../../cell-types/hidden-cell/hidden-cell.component";
describe("should proxy to the right cell component based on cell state", () => {
    beforeEach(() => {
        vi.mock("../hidden-cell/hidden-cell.component", () => {
            const hiddenCellMockComponent = vi.fn(() => {
                return <div className="hidden-cell-mock"></div>;
            });
            return {
                default: hiddenCellMockComponent
            };
        });

        vi.mock("../pointed-cell/pointed-cell.component", () => {
            return {
                default: vi.fn(() => <div className="pointed-cell-mock"></div>)
            };
        });

        vi.mock("../scorched-cell/scorched-cell.component", () => {
            return {
                default: vi.fn(() => <div className="scorched-cell-mock"></div>)
            };
        });
    });

    it("hovering hidden cell state return hovering hidden cell", () => {
        const { container } = render(<Cell state={CellState.Hidden} hover />);

        const hiddenCell = container.querySelector(".hidden-cell-mock");
        expect(HiddenCell).toBeCalledWith(
            expect.objectContaining({
                hover: true
            }),
            {}
        );

        expect(hiddenCell).toBeInTheDocument();
    });

    it("non hovering hidden cell state return non hovering hidden cell", () => {
        const { container } = render(<Cell state={CellState.Hidden} />);

        const hiddenCell = container.querySelector(".hidden-cell-mock");
        expect(HiddenCell).toBeCalledWith(
            expect.objectContaining({
                hover: false
            }),
            {}
        );

        expect(hiddenCell).toBeInTheDocument();
    });

    it("non hovering hidden cell state return non hovering hidden cell", () => {
        const { container } = render(<Cell state={-1 as unknown as CellState} />);

        const hiddenCell = container.querySelector(".hidden-cell-mock");

        expect(hiddenCell).toBeInTheDocument();
    });

    it("pointed cell state return pointed cell", () => {
        const { container } = render(<Cell state={CellState.Pointed} />);
        const pointedCell = container.querySelector(".pointed-cell-mock");

        expect(pointedCell).toBeInTheDocument();
    });

    it("scorched cell state return scorched cell", () => {
        const { container } = render(<Cell state={CellState.Scorched} />);
        const scorchedCell = container.querySelector(".scorched-cell-mock");

        expect(scorchedCell).toBeInTheDocument();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.restoreAllMocks();
        cleanup();
    });
});
