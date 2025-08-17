import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/auth.context";
import CustomButton from "../../../shared/custom-button/custom-button.component";
import GameReportContainer from "../../game-report/game-report-container/game-report-container.component";
import "./ended-room.style.scss";

function RoomEnded({ winnerId, room }: Readonly<{ room: string; winnerId: string | null }>) {
    const { profile } = useContext(AuthContext);
    const navigate = useNavigate();

    const username = profile?.username ?? null;

    if (!username) return <div>There is undexpected error, please restart</div>;

    const resultDisplay = winnerId == username ? <h3>YOU WON</h3> : <h3>YOU LOST</h3>;
    function handleReturnToDashboard() {
        navigate("/");
    }

    return (
        <div className="ended-room-container">
            <div className="ended-room">
                {resultDisplay}
                <GameReportContainer roomId={room} />
                <CustomButton onClick={handleReturnToDashboard}>Return to Dashboard</CustomButton>
            </div>
        </div>
    );
}

export default RoomEnded;
