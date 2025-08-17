import { ScoreDto } from "../../../../dtos/leaderboards.dto";
import "./leaderboards-item.style.scss";

function LeaderboardsItem({ score, index }: Readonly<{ score: ScoreDto; index: number }>) {
    return (
        <tr className="leaderboards-item">
            <td>{index + 1}. </td>
            <td className="name">{score.playerId}</td>
            <td>{score.score}</td>
        </tr>
    );
}

export default LeaderboardsItem;
