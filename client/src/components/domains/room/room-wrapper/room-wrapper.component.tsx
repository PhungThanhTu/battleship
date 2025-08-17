import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketClient } from "../../../../api/socket/socket";
import { RoomActions, RoomEvents } from "../../../../constants/room.constant";
import { RoomMemberDto } from "../../../../dtos/room-member.dto";
import { RoomEndResponseDto, RoomErrorMessage, RoomFetchResponseDto, RoomState } from "../../../../dtos/room.dto";
import RoomContainer from "../room-container/room-container.component";
import RoomNotificationWrapper from "../room-notification-wrapepr/room-notification-wrapepr.component";
import "./room-wrapper.style.scss";

export type RoomWrapperProps = {
    socket: SocketClient;
    setError: (error: string) => void;
    roomId: string;
};

function RoomWrapper(props: Readonly<RoomWrapperProps>) {
    const { roomId, socket, setError } = props;
    const navigate = useNavigate();

    const [room, setRoom] = useState<string>("");
    const [roomState, setRoomState] = useState<RoomState>(RoomState.Unknown);
    const [winnerId, setWinnerId] = useState<string | null>(null);
    const [members, setMembers] = useState<RoomMemberDto[]>([]);

    useEffect(() => {
        const socketEvents: string[] = [];

        function subscribeRoomEvent() {
            socketEvents.push(RoomEvents.ERROR);
            socketEvents.push(RoomEvents.FETCH);
            socketEvents.push(RoomEvents.END);

            socket.subscribe<RoomErrorMessage>({
                event: RoomEvents.ERROR,
                eventHandler: (error) => {
                    setError(error.message);
                }
            });

            socket.subscribe<RoomFetchResponseDto>({
                event: RoomEvents.FETCH,
                eventHandler: ({ state, roomId, winnerId, members }) => {
                    setRoomState(state);
                    setRoom(roomId);
                    setWinnerId(winnerId);
                    setMembers(members);
                }
            });

            socket.subscribe<RoomEndResponseDto>({
                event: RoomEvents.END,
                eventHandler: ({ state, winnerId }) => {
                    setRoomState(state);
                    setWinnerId(winnerId);
                }
            });
        }

        function joinRoom() {
            if (!room) {
                console.log("bring socket ", socket.getSocketId(), " to join the room");
                socket.emit(RoomActions.JOIN, { roomId });
            }
        }

        subscribeRoomEvent();
        joinRoom();

        return () => {
            if (socket) {
                for (const event of socketEvents) {
                    socket.unsubscribe(event);
                }
            }
        };
    }, [socket, setError, room, roomId]);

    function handleRoomReadyCallback() {
        socket.emit(RoomActions.READY);
    }

    function handleRoomQuitCallback() {
        socket.emit(RoomActions.QUIT);
        navigate("/");
    }

    const handleReady = useCallback(handleRoomReadyCallback, [socket]);
    const handleQuit = useCallback(handleRoomQuitCallback, [socket, navigate]);

    const handlers = {
        handleQuit,
        handleReady
    };

    return (
        <>
            <RoomNotificationWrapper socket={socket} />
            <RoomContainer roomState={roomState} members={members} winnerId={winnerId} socket={socket} handlers={handlers} room={room} />
        </>
    );
}

export default RoomWrapper;
