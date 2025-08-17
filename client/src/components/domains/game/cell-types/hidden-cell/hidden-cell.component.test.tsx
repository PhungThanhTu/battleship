import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HiddenCell from "./hidden-cell.component";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("Hidden cell should render based on document", () => {
    beforeEach(() => {
        vi.mock("../indicator/indicator.component", () => {
            return {
                default: () => <div className="indicator-mock"></div>
            };
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should display indicator and hidden cell has class name hover on hover", () => {
        const { container } = render(<HiddenCell hover />);

        const hiddenCell = container.querySelector("div");
        const indicator = container.querySelector(".indicator-mock");

        expect(indicator).toBeInTheDocument();
        expect(hiddenCell?.className).toBe("hidden-cell hover");
    });

    it("should not display indicator and class name doesn't have over on nov hover", () => {
        const { container } = render(<HiddenCell />);

        const hiddenCell = container.querySelector("div");
        const indicator = container.querySelector(".indicator-mock");

        expect(indicator).not.toBeInTheDocument();
        expect(hiddenCell?.className).toBe("hidden-cell");
    });
});
