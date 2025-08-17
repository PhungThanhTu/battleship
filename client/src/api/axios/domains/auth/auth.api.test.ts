import { describe, expect, it, vi } from "vitest";
import { authorizeAndStoreToken, getProfile, logout } from "./auth.api";
import protectedApi from "../../instances/private.axios";
import publicApi from "../../instances/public.axios";
import storage from "../../../storage/auth.local-storage";

describe("auth api get profile", () => {
    it("should retrieve profile", async () => {
        const protectedApiSpy = vi.spyOn(protectedApi, "get");

        const data = {
            username: "bilibili"
        };
        protectedApiSpy.mockImplementation(() =>
            Promise.resolve({
                data
            })
        );

        const response = await getProfile();

        expect(response).toBe(data);
        expect(protectedApiSpy).toBeCalledWith("auth/profile");
    });

    it("should get token", async () => {
        const axiosResponse = {
            status: 201,
            data: {
                token: "test_token"
            }
        };
        const setAccessTokenSpy = vi.spyOn(storage, "setAccessToken");
        const publicApiSpy = vi.spyOn(publicApi, "post");
        publicApiSpy.mockImplementation(() => Promise.resolve(axiosResponse));

        const token = await authorizeAndStoreToken({
            username: "username"
        });

        expect(token).toBe("test_token");
        expect(publicApiSpy).toBeCalledWith("auth/authorize", {
            username: "username"
        });
        expect(setAccessTokenSpy).toBeCalledWith("test_token");
    });

    it("should throw error on no token returned", async () => {
        const axiosResponse = {
            status: 201,
            data: {
                token: null
            }
        };

        const publicApiSpy = vi.spyOn(publicApi, "post");
        publicApiSpy.mockImplementation(() => Promise.resolve(axiosResponse));
        expect(async () => {
            await authorizeAndStoreToken({
                username: "username"
            });
        }).rejects.toThrowError("Get token failed");
    });

    it("should throw error on server fault", async () => {
        const publicApiSpy = vi.spyOn(publicApi, "post");
        publicApiSpy.mockImplementation(() => Promise.reject(new Error("test error")));

        expect(async () => {
            await authorizeAndStoreToken({ username: "username" });
        }).rejects.toThrowError("test error");
    });

    it("should throw error on any other kind of http error", async () => {
        const axiosResponse = {
            status: 400
        };
        const publicApiSpy = vi.spyOn(publicApi, "post");
        publicApiSpy.mockImplementation(() => Promise.resolve(axiosResponse));

        expect(async () => {
            await authorizeAndStoreToken({ username: "username" });
        }).rejects.toThrowError("Get token failed, code 400");
    });

    it("should logout", () => {
        const clearAllTokensSpy = vi.spyOn(storage, "clearAllTokens");
        logout();

        expect(clearAllTokensSpy).toBeCalled();
    });
});
