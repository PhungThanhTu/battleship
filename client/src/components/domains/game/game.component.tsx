import { GameFetchResponseDto, ShootPositionDto } from "../../../dtos/game.dto";
import CustomButton from "../../shared/custom-button/custom-button.component";
import AllyBoard from "./board-types/ally-board/ally-board.componentt";
import EnemyBoard from "./board-types/enemy-board/enemy-board.component";
import GameLoading from "./game-loading/game-loading.component";
import "./game.style.scss";

export interface GameProps {
    game: GameFetchResponseDto | null;
    handlers: GameHandlers;
}

export interface GameHandlers {
    handleResign: () => void;
    handleShoot: (pos: ShootPositionDto) => void;
}

function Game(props: Readonly<GameProps>) {
    const { game, handlers } = props;
    const { handleResign, handleShoot } = handlers;

    if (!game) return <GameLoading />;

    const { allies, enemies, isTurn } = game;
    return (
        <div>
            <div className="game-container">
                <AllyBoard board={allies[0]} isTurn={isTurn} />
                <EnemyBoard board={enemies[0]} isTurn={isTurn} handleShoot={handleShoot} />
            </div>
            <div className="resign-button-container">
                <CustomButton onClick={handleResign}>Resign</CustomButton>
            </div>
        </div>
    );
}

export default Game;
