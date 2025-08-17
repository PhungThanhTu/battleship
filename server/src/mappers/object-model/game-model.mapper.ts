import { Game } from "../../core/game/game";
import { createTurnManager } from "../../core/turn-manager/turn-manager";
import { GameModel } from "../../models/game.model";
import { mapPlayerToModel } from "./player-model.mapper";
import { mapTurnManagerToModel } from "./turn-manager-model.mapper";

export function mapGameToModel(game: Game): GameModel {
    const concretePlayers = game.getPlayers();
    const players = concretePlayers.map(player => mapPlayerToModel(player));
    const concreteTurnManager = game.getTurnManager() 
        ?? createTurnManager(concretePlayers.map(player => player.getId()));

    const turnManager = mapTurnManagerToModel(concreteTurnManager);

    return {
        players,
        turnManager
    }
}
