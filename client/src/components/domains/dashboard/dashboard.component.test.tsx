import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Dashboard from "./dashboard.component";
import { AuthContext } from "../../../contexts/auth.context";
import { AuthState } from "../../../hooks/auth.hook";

const navigateMock = vi.fn();
const logOutMock = vi.fn();

describe("should logout on click", () => {
    const fakeContextValue: AuthState = {
        logOut: logOutMock,
        loading: false,
        profile: null,
        login: function (username: string): Promise<void> {
            throw new Error(username);
        }
    };

    vi.mock("react-router-dom", async (requestActualModule) => {
        const original: object = await requestActualModule();

        return {
            ...original,
            useNavigate: () => navigateMock
        };
    });

    beforeEach(() => {
        render(
            <AuthContext.Provider value={fakeContextValue}>
                <Dashboard />
            </AuthContext.Provider>
        );
    });

    it("there should be a create room button", () => {
        expect(
            screen.getByRole("button", {
                name: /create/i
            })
        ).toBeInTheDocument();
    });

    it("there should be a join button", () => {
        expect(
            screen.getByRole("button", {
                name: "Join"
            })
        ).toBeInTheDocument();
    });

    it("there should be a enter room code textbox placeholder", () => {
        expect(screen.getByPlaceholderText(/enter room code/i)).toBeInTheDocument();
    });

    it("should navigate to new room on click create room", () => {
        const createRoomButton = screen.getByRole("button", {
            name: /create/i
        });

        fireEvent.click(createRoomButton);

        expect(navigateMock).toBeCalledWith("/room");
    });
});
