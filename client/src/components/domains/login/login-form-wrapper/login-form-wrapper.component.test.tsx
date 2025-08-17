import "@testing-library/jest-dom/vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { ChangeEvent } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthContext } from "../../../../contexts/auth.context";
import { AuthState } from "../../../../hooks/auth.hook";
import { LoginFormProps } from "../login-form/login-form.component";
import { LoginFormWrapper } from "./login-form-wrapper.component";

const navigateMock = vi.fn();
const getRoomStub = vi.fn();

function fakeLoginForm({ onUsernameChange, onLogin, username }: Readonly<LoginFormProps>) {
    const onUsernameChangeStub = function (e: ChangeEvent<HTMLInputElement>) {
        onUsernameChange(e.target.value);
    };

    return (
        <div>
            <input data-testid="username" onChange={onUsernameChangeStub} value={username} />
            <button data-testid="button" onClick={onLogin} />
        </div>
    );
}

describe("should render and act correctly", () => {
    beforeEach(() => {
        vi.mock("../login-form/login-form.component", () => {
            return {
                default: fakeLoginForm
            };
        });

        vi.mock("react-router-dom", async (requestActualModule) => {
            const original: object = await requestActualModule();

            return {
                ...original,
                useNavigate: () => navigateMock
            };
        });

        vi.mock("../../api/axios/room/room.api", () => {
            return {
                default: {
                    getCurrentRoom: () => getRoomStub
                }
            };
        });
    });

    afterEach(() => {
        getRoomStub.mockClear();
        navigateMock.mockClear();
    });

    it("should display the login form", () => {
        const login = vi.fn();
        const fakeContextValue: AuthState = {
            logOut: () => {},
            loading: false,
            profile: null,
            login
        };
        const wrapper = render(
            <AuthContext.Provider value={fakeContextValue}>
                <LoginFormWrapper />
            </AuthContext.Provider>
        );

        const loginForm = wrapper.getByTestId(/username/i);

        expect(loginForm).toBeInTheDocument();
    });

    it("should redirect to / on login if no room", async () => {
        const login = vi.fn();
        login.mockResolvedValue({});
        getRoomStub.mockRejectedValue({});

        const fakeContextValue: AuthState = {
            logOut: () => {},
            loading: false,
            profile: null,
            login
        };
        const wrapper = render(
            <AuthContext.Provider value={fakeContextValue}>
                <LoginFormWrapper />
            </AuthContext.Provider>
        );

        const button = wrapper.getByTestId(/button/i);
        const input = wrapper.getByTestId(/username/i);
        fireEvent.change(input, {
            target: {
                value: "test"
            }
        });
        fireEvent.click(button);

        expect(login).toBeCalledWith("test");
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith("/");
        });
    });

    it("should call alert on login fail", async () => {
        const login = vi.fn();
        login.mockRejectedValue({});
        const alertSpy = vi.spyOn(window, "alert");

        const fakeContextValue: AuthState = {
            logOut: () => {},
            loading: false,
            profile: null,
            login
        };
        const wrapper = render(
            <AuthContext.Provider value={fakeContextValue}>
                <LoginFormWrapper />
            </AuthContext.Provider>
        );

        const button = wrapper.getByTestId(/button/i);
        const input = wrapper.getByTestId(/username/i);
        fireEvent.change(input, {
            target: {
                value: "test"
            }
        });
        fireEvent.click(button);

        waitFor(() => {
            expect(alertSpy).toBeCalledWith("Login failed");
            expect(navigateMock).not.toHaveBeenCalled();
        });
    });

    it("should navigate to room when room has value", () => {
        const expectedRoomId = "testt";
        getRoomStub.mockResolvedValue({
            roomId: expectedRoomId
        });

        const login = vi.fn();
        login.mockRejectedValue({});

        const fakeContextValue: AuthState = {
            logOut: () => {},
            loading: false,
            profile: null,
            login
        };
        const wrapper = render(
            <AuthContext.Provider value={fakeContextValue}>
                <LoginFormWrapper />
            </AuthContext.Provider>
        );

        const button = wrapper.getByTestId(/button/i);
        const input = wrapper.getByTestId(/username/i);
        fireEvent.change(input, {
            target: {
                value: "test"
            }
        });
        fireEvent.click(button);

        waitFor(() => {
            expect(navigateMock).toBeCalledWith("/testt");
        });
    });
});
