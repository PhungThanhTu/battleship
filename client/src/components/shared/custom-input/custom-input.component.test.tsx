import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import CustomInput from "./custom-input.component";

test("custom input should render correctly", () => {
    const { container } = render(<CustomInput type="text" />);

    const input = container.querySelector("input");

    expect(input?.className).toBe("custom-input");
    expect(input?.type).toBe("text");
});
