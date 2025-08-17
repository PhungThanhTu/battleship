import { SocketClient } from "../../../../api/socket/socket";
import RoomLoading from "../room-loading/room-loading.component";
import RoomSocketError from "../room-socket-error/room-socket-error.component";
import "./room-initializer.style.scss";

export interface RoomInitializerProps {
    socket: SocketClient | null;
}

function RoomInitializer(props: Readonly<RoomInitializerProps>) {
    const { socket } = props;

    const displayRoom = socket ? <RoomLoading /> : <RoomSocketError />;

    return <>{displayRoom}</>;
}

export default RoomInitializer;
