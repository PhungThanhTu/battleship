import { ChangeEvent, useState } from "react";
import "./dashboard.style.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../shared/custom-button/custom-button.component";
import CustomInput from "../../shared/custom-input/custom-input.component";
function Dashboard() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    function handleCreateRoomClick() {
        navigate("/room");
    }

    function onRoomChange(e: ChangeEvent<HTMLInputElement>) {
        setRoomId(e.target.value);
    }

    function handleJoinRoomClick() {
        navigate(`/room/${roomId}`);
    }

    return (
        <div className="dashboard">
            <CustomButton onClick={handleCreateRoomClick} type="button">
                Create
            </CustomButton>
            <div className="room-enter-panel">
                <CustomInput placeholder="enter room code" onChange={onRoomChange} value={roomId} />
                <CustomButton onClick={handleJoinRoomClick}>Join</CustomButton>
            </div>
        </div>
    );
}

export default Dashboard;
