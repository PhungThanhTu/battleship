import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ScorchedCell from "./scorched-cell.component";

describe("should render scorched cell", () => {
    it("should have 3 particle", () => {
        const { container } = render(<ScorchedCell />);

        const particles = container.querySelectorAll(".particle");

        expect(particles.length).toBe(3);
    });

    it("should have class scorched-cell", () => {
        const { container } = render(<ScorchedCell />);

        const cell = container.querySelector("div");

        expect(cell?.className).toBe("scorched-cell");
    });
});
