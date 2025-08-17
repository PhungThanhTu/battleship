import { useContext } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import { RoomMemberDto, RoomMemberState } from "../../../../dtos/room-member.dto";
import { getUniqueId } from "../../../../utils/id";
import CustomButton from "../../../shared/custom-button/custom-button.component";
import RoomMember from "../room-member/room-member.component";
import "./waiting-room.style.scss";

export type WaitingRoomProps = {
    room: string;
    members: RoomMemberDto[];
    handlers: WaitingRoomHandlers;
};

export type WaitingRoomHandlers = {
    handleReady: () => void;
    handleQuit: () => void;
};

function WaitingRoom({ room, members, handlers }: Readonly<WaitingRoomProps>) {
    const { profile } = useContext(AuthContext);
    const { handleReady, handleQuit } = handlers;
    const roomMembers = members.map((member) => <RoomMember key={getUniqueId()} member={member} />);

    const isReady = members.find((member) => member.playerId === profile?.username)?.state === RoomMemberState.Ready;

    function handleReadyClick() {
        handleReady();
    }

    function handleQuitClick() {
        handleQuit();
    }

    return (
        <div className="waiting-room-container">
            <h3>This is room {room}</h3>
            <div className="waiting-room-buttons">
                <CustomButton disabled={isReady} onClick={handleReadyClick}>
                    Get Ready
                </CustomButton>
                <CustomButton onClick={handleQuitClick}>Quit</CustomButton>
            </div>
            <h3>Players :</h3>
            {roomMembers}
        </div>
    );
}

export default WaitingRoom;
