import { useCallback, useEffect, useMemo, useState } from "react";
import { LeaderboardsDto } from "../dtos/leaderboards.dto";
import { getLeaderboards } from "../api/axios/domains/leaderboards/leaderboards.api";

function useLeaderboards() {
    const [leaderboards, setLeaderboards] = useState<LeaderboardsDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const tryGetLeaderboards = useCallback(
        async function (ignore: boolean) {
            if (error) return;
            if (leaderboards) return;

            try {
                const newLeaderboards = await getLeaderboards();
                if (!ignore) return setLeaderboards(newLeaderboards);
            } catch (err: unknown) {
                if (!ignore) {
                    if (err instanceof Error) return setError(err.message);
                    return setError("unknown error");
                }
            }
        },
        [error, leaderboards]
    );

    const refreshLeaderboards = useCallback(function () {
        setError(null);
        setLeaderboards(null);
    }, []);

    useEffect(() => {
        let ignore = false;

        tryGetLeaderboards(ignore);

        return () => {
            ignore = true;
        };
    }, [leaderboards, error, tryGetLeaderboards]);

    const value = useMemo(
        () => ({
            leaderboards,
            error,
            refreshLeaderboards
        }),
        [leaderboards, error, refreshLeaderboards]
    );

    return value;
}

export default useLeaderboards;
