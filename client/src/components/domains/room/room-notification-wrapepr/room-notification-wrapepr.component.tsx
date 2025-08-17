import { useEffect, useState } from "react";
import { SocketClient } from "../../../../api/socket/socket";
import { RoomEvents } from "../../../../constants/room.constant";
import { RoomNotificationResponseDto } from "../../../../dtos/room.dto";
import RoomNotification from "../room-notification/room-notification.component";
import "./room-notification-wrapepr.style.scss";

const MESSAGE_LIVE_TIME = 2000;

export interface RoomNotificationWrapperProps {
    socket: SocketClient;
}

function RoomNotificationWrapper(props: Readonly<RoomNotificationWrapperProps>) {
    const { socket } = props;
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        let timer: InstanceType<typeof NodeJS.Timeout> | null = null;
        function clearMessageAfter() {
            timer = setTimeout(() => {
                setMessage(null);
            }, MESSAGE_LIVE_TIME);
        }
        if (message) {
            clearMessageAfter();
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [message]);

    useEffect(() => {
        const events: string[] = [];

        function registerSocketEvent() {
            events.push(RoomEvents.NOTIFICATION);
            socket.subscribe<RoomNotificationResponseDto>({
                event: RoomEvents.NOTIFICATION,
                eventHandler: (notifaction) => {
                    setMessage(notifaction.message);
                }
            });
        }

        registerSocketEvent();

        return () => {
            if (socket) {
                events.forEach((event) => socket.unsubscribe(event));
            }
        };
    }, [socket]);

    return <RoomNotification message={message} />;
}

export default RoomNotificationWrapper;
