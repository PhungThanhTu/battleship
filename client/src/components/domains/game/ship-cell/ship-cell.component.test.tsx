import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Color } from "../../../../dtos/cell.dto";
import ShipCell from "./ship-cell.component";

describe("Ship component should render based on props", () => {
    it("revealed ship should have class revealed", () => {
        const { container } = render(<ShipCell color={Color.Green} dead />);

        const shipCell = container.querySelector("div");

        expect(shipCell?.className).toBe("ship-cell revealed");
    });

    it("Revealed ship should show skull img", () => {
        const { container } = render(<ShipCell color={Color.Green} dead />);
        const skull = container.querySelector("img");

        expect(skull).toBeInTheDocument();
    });

    it("hidden ship don't have class revealded", () => {
        const { container } = render(<ShipCell color={Color.Green} />);

        const shipCell = container.querySelector("div");

        expect(shipCell?.className).toBe("ship-cell");
    });

    it("hidden ship don't have a skull", () => {
        const { container } = render(<ShipCell color={Color.Green} />);

        const skull = container.querySelector("img");

        expect(skull).not.toBeInTheDocument();
    });
});
