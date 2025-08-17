import { SocketClient } from "../../../../api/socket/socket";
import { RoomMemberDto } from "../../../../dtos/room-member.dto";
import { RoomState } from "../../../../dtos/room.dto";
import RoomEnded from "../room-ended/ended-room.component";
import RoomLoading from "../room-loading/room-loading.component";
import RoomStarted from "../room-started/started-room.component";
import WaitingRoom from "../room-waiting/waiting-room.component";
import "./room-container.style.scss";

export interface RoomContainerProps {
    roomState: RoomState;
    members: RoomMemberDto[];
    winnerId: string | null;
    socket: SocketClient;
    handlers: {
        handleReady: () => void;
        handleQuit: () => void;
    };
    room: string;
}

function RoomContainer(props: Readonly<RoomContainerProps>) {
    const { roomState } = props;

    switch (roomState) {
        case RoomState.Waiting:
            return <WaitingRoom members={props.members} room={props.room} handlers={props.handlers} />;
        case RoomState.Started:
            return <RoomStarted socket={props.socket} />;
        case RoomState.Ended:
            return <RoomEnded room={props.room} winnerId={props.winnerId} />;

        default:
            return <RoomLoading />;
    }
}

export default RoomContainer;
