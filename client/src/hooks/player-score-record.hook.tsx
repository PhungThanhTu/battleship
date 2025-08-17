import { useCallback, useEffect, useMemo, useState } from "react";
import { PlayerScoreRecordDto } from "../dtos/player-score-record.dto";
import { getPlayerScoreRecord } from "../api/axios/domains/player-score-record/player-score-record.api";

function usePlayerScoreRecord(roomId: string) {
    const [playerScoreRecord, setPlayerScoreRecord] = useState<PlayerScoreRecordDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const tryGetPlayerScoreRecord = useCallback(
        async function (ignore: boolean) {
            if (error) return;
            if (playerScoreRecord) return;

            try {
                const newPlayerScoreRecord = await getPlayerScoreRecord(roomId);
                if (!ignore) return setPlayerScoreRecord(newPlayerScoreRecord);
            } catch (err: unknown) {
                if (!ignore) {
                    if (err instanceof Error) return setError(err.message);
                    return setError("unknown error");
                }
            }
        },
        [error, playerScoreRecord, roomId]
    );

    useEffect(() => {
        let ignore = false;

        tryGetPlayerScoreRecord(ignore);

        return () => {
            ignore = true;
        };
    }, [playerScoreRecord, error, roomId, tryGetPlayerScoreRecord]);

    const value = useMemo(
        () => ({
            playerScoreRecord,
            error
        }),
        [playerScoreRecord, error]
    );

    return value;
}

export default usePlayerScoreRecord;
