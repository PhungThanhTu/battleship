import { RoomByPlayerIdResponseDto } from "../../../../dtos/room.dto";
import protectedApi from "../../instances/private.axios";

const PATH_AREA = "room";

export async function getCurrentRoom(): Promise<RoomByPlayerIdResponseDto> {
    const response = await protectedApi.get<RoomByPlayerIdResponseDto>(PATH_AREA);

    return response.data;
}
