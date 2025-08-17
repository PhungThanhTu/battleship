import { describe, expect, it } from "vitest";
import Indicator from "./indicator.component";
import { render } from "@testing-library/react";

describe("should render indicator svg", () => {
    it("should render svg with class indicator", () => {
        const { container } = render(<Indicator />);

        const svg = container.querySelector("svg");

        expect(svg?.classList[0]).toBe("indicator");
    });
});
