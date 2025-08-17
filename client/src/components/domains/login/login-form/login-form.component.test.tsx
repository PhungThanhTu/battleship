import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./login-form.component";

const mockUsernameChange = vi.fn();
const mockOnLogin = vi.fn();

describe("should render login form correctly", () => {
    beforeEach(() => {
        render(<LoginForm username="test-username" onUsernameChange={mockUsernameChange} onLogin={mockOnLogin} />);
    });

    afterEach(() => {
        mockOnLogin.mockRestore();
        mockUsernameChange.mockRestore();
    });

    it("should display a join button", () => {
        expect(
            screen.getByRole("button", {
                name: /join/i
            })
        ).toBeInTheDocument();
    });

    it("should display username textbox", () => {
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    });

    it("should display the username props", () => {
        const usernameInput = screen.getByPlaceholderText(/username/i);

        expect(usernameInput).toHaveAttribute("value", "test-username");
    });

    it("should login on submit", () => {
        const formSubmit = screen.getByRole("button", {
            name: /join/i
        });
        fireEvent.submit(formSubmit);

        expect(mockOnLogin).toBeCalled();
    });

    it("should call change username on change", () => {
        const input = screen.getByPlaceholderText("username");
        fireEvent.change(input, {
            target: {
                value: "test-user-change"
            }
        });

        expect(mockUsernameChange).toBeCalledWith("test-user-change");
    });
});
