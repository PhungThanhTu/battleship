import { describe, expect, it, vi } from "vitest";
import { LeaderboardsDto } from "../../../../dtos/leaderboards.dto";
import { getLeaderboards } from "./leaderboards.api";
import publicApi from "../../instances/public.axios";

describe("leaderboards api get leadersboard", () => {
    it("should retrieve leaderboards", async () => {
        const publicApiSpy = vi.spyOn(publicApi, "get");

        const data: LeaderboardsDto = [
            {
                playerId: "urara",
                score: 30
            },
            {
                playerId: "champa",
                score: 0
            }
        ];

        publicApiSpy.mockImplementation(() =>
            Promise.resolve({
                data
            })
        );

        const response = await getLeaderboards();
        expect(response).toBe(data);
        expect(publicApiSpy).toBeCalledWith("leaderboards");
    });
});
