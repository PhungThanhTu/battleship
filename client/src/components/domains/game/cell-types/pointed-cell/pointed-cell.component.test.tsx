import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import PointedCell from "./pointed-cell.component";

describe("should render correctly", () => {
    it("should render pointed cell", () => {
        const { container } = render(<PointedCell />);

        const pointedCell = container.querySelector(".pointed-cell");

        expect(pointedCell).toBeInTheDocument();
    });
});
