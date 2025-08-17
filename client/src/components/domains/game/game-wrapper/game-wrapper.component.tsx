import { useCallback, useEffect, useState } from "react";
import { SocketClient } from "../../../../api/socket/socket";
import { GameClientEvent, GameEvents } from "../../../../constants/game.constant";
import { GameFetchResponseDto, ShootPositionDto } from "../../../../dtos/game.dto";
import Game from "../game.component";
import "./game-wrapper.style.scss";

export interface GameWrapperProps {
    socket: SocketClient;
}

function GameWrapper(props: Readonly<GameWrapperProps>) {
    const { socket } = props;

    const [game, setGame] = useState<GameFetchResponseDto | null>(null);

    useEffect(() => {
        const socketEvents: string[] = [];

        function registerSocketEvent() {
            socket.subscribe<GameFetchResponseDto>({
                event: GameEvents.FETCH,
                eventHandler(data) {
                    setGame(data);
                }
            });
            socketEvents.push(GameEvents.FETCH);
        }

        function requestSync() {
            socket.emit(GameClientEvent.SYNC);
        }
        registerSocketEvent();
        requestSync();

        return () => {
            socketEvents.forEach((event) => socket.unsubscribe(event));
        };
    }, [socket]);

    function handleShootCallBack(pos: ShootPositionDto) {
        socket.emit(GameClientEvent.SHOOT, pos);
    }

    function handleResignCallback() {
        socket.emit(GameClientEvent.RESIGN);
    }
    const handleResign = useCallback(handleResignCallback, [socket]);
    const handleShoot = useCallback(handleShootCallBack, [socket]);

    const handlers = { handleResign, handleShoot };

    return <Game game={game} handlers={handlers} />;
}

export default GameWrapper;
