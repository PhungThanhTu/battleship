import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketClient } from "../../../../api/socket/socket";
import { RoomActions, RoomEvents } from "../../../../constants/room.constant";
import { RoomCreatedResponseDto } from "../../../../dtos/room.dto";
import RoomInitializer from "../room-initializer/room-initializer.component";
import "./room-initializer-wrapper.style.scss";

export interface RoomInitializerWrapperProps {
    socket: SocketClient | null;
}

function RoomInitializerWrapper(props: Readonly<RoomInitializerWrapperProps>) {
    const { socket } = props;
    const navigate = useNavigate();

    useEffect(() => {
        function subscribeSocketEvent() {
            if (!socket) return;

            socket.subscribe<RoomCreatedResponseDto>({
                event: RoomEvents.CREATE,
                eventHandler: (message) => {
                    navigate(`/room/${message.roomId}`);
                }
            });
        }

        if (socket) {
            subscribeSocketEvent();
            socket.emit(RoomActions.CREATE);
        }

        return () => {
            socket?.unsubscribe(RoomEvents.CREATE);
        };
    }, [socket, navigate]);

    return <RoomInitializer socket={socket} />;
}

export default RoomInitializerWrapper;
