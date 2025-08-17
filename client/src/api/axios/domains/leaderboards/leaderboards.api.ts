import { LeaderboardsDto } from "../../../../dtos/leaderboards.dto";
import publicApi from "../../instances/public.axios";

const PATH_AREA = "leaderboards";

export async function getLeaderboards(): Promise<LeaderboardsDto> {
    const response = await publicApi.get<LeaderboardsDto>(PATH_AREA);

    return response.data;
}
