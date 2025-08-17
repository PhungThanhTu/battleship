import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketClient, createSocketClient } from "../../../../api/socket/socket";
import useAuth from "../../../../hooks/auth.hook";
import { getUniqueId } from "../../../../utils/id";
import RoomLoader from "../room-loader/room-loader.component";
import "./room-loader-wrapper.style.scss";

const UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized";

function RoomLoaderWrapper() {
    const [socket, setSocket] = useState<SocketClient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const { roomId } = useParams();

    useEffect(() => {
        function handleError(err: Error) {
            if (err.message == UNAUTHORIZED_ERROR_MESSAGE) {
                logOut();
                navigate("/", {
                    replace: true
                });
            }

            return setError(err.message);
        }

        async function createSocket() {
            try {
                const newSocket = await createSocketClient();
                if (!newSocket) {
                    throw new Error("cannot create new socket");
                }

                newSocket.subscribe({
                    event: "connect_error",
                    eventHandler: () => {
                        setError("socket connection error");
                    }
                });

                newSocket.subscribe({
                    event: "kicked",
                    eventHandler: () => {
                        setError("you can only login at one place at the same time");
                        alert("you can only login at one place at the same time");
                        logOut();
                    }
                });

                setError(null);
                return setSocket(newSocket);
            } catch (err) {
                if (err instanceof Error) return handleError(err);
                return setError("unknown error");
            }
        }

        if (!socket && !error) {
            createSocket();
        }

        if (socket?.getIsDisposed() && !error) {
            createSocket();
        }

        return () => {
            if (socket) socket.dispose();
        };
    }, [socket, error, logOut, navigate, roomId]);

    return <RoomLoader key={getUniqueId()} roomId={roomId} socket={socket} error={error} setError={setError} />;
}

export default RoomLoaderWrapper;
