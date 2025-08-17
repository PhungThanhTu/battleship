import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import CustomButton from "./custom-button.component";

test("custom component should render correctly", () => {
    const { container } = render(<CustomButton>Test Custom Button</CustomButton>);

    const customButton = container.querySelector("button");

    expect(customButton?.innerHTML).toBe("Test Custom Button");
    expect(customButton?.className).toBe("bs-button");
    expect(customButton?.type).toBe("submit");
});

test("custom component should render specified type", () => {
    const { container } = render(<CustomButton type="button">Test Custom Button</CustomButton>);

    const customButton = container.querySelector("button");

    expect(customButton?.innerHTML).toBe("Test Custom Button");
    expect(customButton?.className).toBe("bs-button");
    expect(customButton?.type).toBe("button");
});
