import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/custom-button/custom-button.component";

function RoomError({ error }: Readonly<{ error: string }>) {
    const navigate = useNavigate();

    function handleBackToDashboard() {
        navigate("/");
    }

    return (
        <div>
            <p>Failed to load room, please turn back</p>
            <CustomButton onClick={handleBackToDashboard}>Back to dashboard</CustomButton>
            <p> Debug {error}</p>
        </div>
    );
}

export default RoomError;
