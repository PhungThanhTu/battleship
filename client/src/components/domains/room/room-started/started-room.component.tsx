import { SocketClient } from "../../../../api/socket/socket";
import GameWrapper from "../../game/game-wrapper/game-wrapper.component";
import "./started-room.style.scss";

export interface StartedRoomProps {
    socket: SocketClient;
}

function RoomStarted(props: Readonly<StartedRoomProps>) {
    const { socket } = props;

    return <GameWrapper socket={socket} />;
}

export default RoomStarted;
