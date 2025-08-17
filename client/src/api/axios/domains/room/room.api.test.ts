import { describe, expect, it, vi } from "vitest";
import protectedApi from "../../instances/private.axios";
import { RoomByPlayerIdResponseDto } from "../../../../dtos/room.dto";
import { getCurrentRoom } from "./room.api";

describe("should retrieve correct room id on call with token", async () => {
    it("should return room", async () => {
        const protectedApiSpy = vi.spyOn(protectedApi, "get");

        const data: RoomByPlayerIdResponseDto = {
            roomId: "abcde"
        };

        protectedApiSpy.mockImplementation(() =>
            Promise.resolve({
                data
            })
        );

        const response = await getCurrentRoom();
        expect(response).toBe(data);
        expect(protectedApiSpy).toBeCalledWith("room");
    });
});
