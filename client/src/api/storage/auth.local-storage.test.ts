import { describe, expect, it, vi } from "vitest";
import authStorage from "./auth.storage";

describe("local storage api", () => {
    vi.mock("./auth.storage", () => {
        return {
            default: vi.fn()
        };
    });

    it("should get right access token", async () => {
        await import("./auth.local-storage");

        expect(authStorage).toBeCalledWith(localStorage);
    });
});
