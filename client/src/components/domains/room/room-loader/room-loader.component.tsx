import { SocketClient } from "../../../../api/socket/socket";
import RoomError from "../room-error/room-error.component";
import RoomInitializerWrapper from "../room-initializer-wrapper/room-initializer-wrapper.component";
import RoomWrapper from "../room-wrapper/room-wrapper.component";
import "./room-loader.style.scss";

interface RoomLoaderProps {
    socket: SocketClient | null;
    error: string | null;
    setError: (error: string) => void;
    roomId?: string;
}

function RoomLoader(props: Readonly<RoomLoaderProps>) {
    const { socket, error, setError, roomId } = props;

    if (error) return <RoomError error={error} />;
    if (!roomId || !socket) return <RoomInitializerWrapper socket={socket} />;

    return <RoomWrapper roomId={roomId} socket={socket} setError={setError} />;
}

export default RoomLoader;
