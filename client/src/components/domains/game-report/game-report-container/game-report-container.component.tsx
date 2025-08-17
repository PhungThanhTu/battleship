import usePlayerScoreRecord from "../../../../hooks/player-score-record.hook";
import GameReport from "../game-report/game-report.component";
import "./game-report-container.style.scss";

export type GameReportContainerProps = {
    roomId: string;
};

function GameReportContainer({ roomId }: Readonly<GameReportContainerProps>) {
    const { playerScoreRecord, error } = usePlayerScoreRecord(roomId);

    if (error) return <div>Error {error}</div>;
    if (!playerScoreRecord) return <div>Loading</div>;

    return <GameReport playerScoreRecord={playerScoreRecord} />;
}

export default GameReportContainer;
