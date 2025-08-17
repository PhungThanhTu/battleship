vi.stubEnv("VITE_API_SERVICE", "localtest");

import { describe, expect, it, vi } from "vitest";

describe("public api axios instance", () => {
    it("should get right config", async () => {
        const publicApi = await import("./public.axios"); // dynamic import to apply envar

        expect(publicApi.default.getUri()).toBe("/api");
    });
});
