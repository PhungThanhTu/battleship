import useLeaderboards from "../../../../hooks/leaderboards.hook";
import Leaderboards from "../leaderboards/leaderboards.component";
import "./leaderboards-wrapper.style.scss";

function LeaderboardsWrapper() {
    const { leaderboards, error } = useLeaderboards();

    return <Leaderboards leaderboards={leaderboards} error={error} />;
}

export default LeaderboardsWrapper;
