import { GameServerContext } from "../../contexts/game-server.context";
import { Game, createGame } from "../../core/game/game";
import { GameModel } from "../../models/game.model";
import { mapModelToPlayer } from "./model-player.mapper";
import { mapModelToTurnManager } from "./model-turn-manager.mapper";

export function mapModelToGame(context: GameServerContext, gameModel: GameModel | null = null): Game | null {
    if (!gameModel) return null;
    const players = gameModel.players.map(player => mapModelToPlayer(player));
    const turnManager = mapModelToTurnManager(gameModel.turnManager);

    return createGame(context, players, turnManager);
}
