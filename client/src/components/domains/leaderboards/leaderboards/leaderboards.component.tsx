import { LeaderboardsDto } from "../../../../dtos/leaderboards.dto";
import { getUniqueId } from "../../../../utils/id";
import LeaderboardsItem from "../leaderboards-item/leaderboards-item.component";
import "./leaderboards.style.scss";

function Leaderboards({ leaderboards, error }: Readonly<LeaderboardProps>) {
    if (error) return <div>Error loading leaderboards</div>;

    if (leaderboards == null) return <div> Loading ...</div>; // there is a case leaderboards is empty array

    const leaderboardsItemList = leaderboards.map((score, index) => <LeaderboardsItem index={index} key={getUniqueId()} score={score} />);

    return (
        <div className="leaderboards">
            <div className="leaderboard-container">
                <div className="leaderboards-title">
                    <span className="cup-icon"></span>
                    <span className="leaderboard-text">LEADERBOARDS</span>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th className="name-header" colSpan={2}></th>
                            <th className="score-header">Score</th>
                        </tr>
                        {leaderboardsItemList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboards;

export type LeaderboardProps = {
    leaderboards: LeaderboardsDto | null;
    error: string | null;
};
