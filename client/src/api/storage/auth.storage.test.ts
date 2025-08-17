import { describe, expect, it, vi } from "vitest";
import authStorage from "./auth.storage";

describe("auth storage", () => {
    const mockStorage: Storage = {
        removeItem: vi.fn(),
        length: 0,
        clear: vi.fn(),
        getItem: vi.fn(() => "test_token"),
        key: vi.fn(),
        setItem: vi.fn()
    };
    const storage = authStorage(mockStorage);

    it("should clear token", () => {
        storage.clearAllTokens();
        expect(mockStorage.removeItem).toBeCalledWith("auth_token");
    });

    it("should get access token", () => {
        const token = storage.getAccessToken();

        expect(mockStorage.getItem).toBeCalledWith("auth_token");
        expect(token).toBe("test_token");
    });

    it("should set access token", () => {
        storage.setAccessToken("test_token");

        expect(mockStorage.setItem).toBeCalledWith("auth_token", "test_token");
    });
});
