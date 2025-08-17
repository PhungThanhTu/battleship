import { PlayerScoreRecordDto } from "../../../../dtos/player-score-record.dto";
import "./game-report.style.scss";

export type GameReportProps = {
    playerScoreRecord: PlayerScoreRecordDto;
};
function GameReport(props: Readonly<GameReportProps>) {
    const { playerScoreRecord } = props;
    const { delta } = playerScoreRecord;

    let colorDisplayClass = "";
    let deltaDisplay;
    if (delta == 0) deltaDisplay = "😏";
    if (delta > 0) {
        deltaDisplay = `+${delta}`;
        colorDisplayClass = "green";
    }
    if (delta < 0) {
        deltaDisplay = delta;
        colorDisplayClass = "red";
    }

    return (
        <table className="game-report">
            <tbody>
                <tr>
                    <th></th>
                </tr>
                <tr>
                    <td className="point-label">Points:</td>
                    <td className={`point-delta ${colorDisplayClass}`}>{deltaDisplay}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default GameReport;