import "./room-notification.style.scss";

export type RoomNotificationProps = {
    message: string | null;
};

function RoomNotification(props: Readonly<RoomNotificationProps>) {
    const { message } = props;

    if (!message) return null;

    return <div>{message}</div>;
}

export default RoomNotification;
