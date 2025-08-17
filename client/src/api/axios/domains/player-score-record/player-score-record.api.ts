import { PlayerScoreRecordDto } from "../../../../dtos/player-score-record.dto";
import protectedApi from "../../instances/private.axios";

const PATH_AREA = "score-record";

export async function getPlayerScoreRecord(roomId: string): Promise<PlayerScoreRecordDto> {
    const response = await protectedApi.get<PlayerScoreRecordDto>(PATH_AREA, {
        params: {
            roomId
        }
    });

    return response.data;
}
