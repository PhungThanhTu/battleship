import { describe, expect, it, vi } from "vitest";
import protectedApi from "./private.axios";
import MockAdapter from "axios-mock-adapter";
import storage from "../../storage/auth.local-storage";
describe("protected API", () => {
    it("should should attach token to request", async () => {
        const data = { success: true };
        vi.spyOn(storage, "getAccessToken").mockImplementation(() => "test_token");
        const mock = new MockAdapter(protectedApi);
        mock.onGet("/test").reply(200, data);
        const response = await protectedApi.get("/test");

        expect(response.config.headers.Authorization).toBe("Bearer test_token");
    });

    it("should throw error if no token", async () => {
        const data = { success: true };
        vi.spyOn(storage, "getAccessToken").mockImplementation(() => null);
        const mock = new MockAdapter(protectedApi);
        mock.onGet("/test").reply(200, data);

        expect(async () => {
            await protectedApi.get("/test");
        }).rejects.toThrowError("Get token from browser storage fail");
    });

    it("should clear all token on unauthorized", async () => {
        vi.spyOn(storage, "getAccessToken").mockImplementation(() => "test");
        const clearTokenSpy = vi.spyOn(storage, "clearAllTokens");
        const clearTokenMock = vi.fn();
        clearTokenSpy.mockImplementation(clearTokenMock);
        const mock = new MockAdapter(protectedApi);
        mock.onGet("/test").reply(401);
        await protectedApi.get("/test");

        expect(clearTokenMock).toBeCalled();
    });
});
