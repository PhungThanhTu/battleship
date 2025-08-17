import { TurnManager } from "../../core/turn-manager/turn-manager";
import { TurnManagerModel } from "../../models/turn-manager.model";

export function mapTurnManagerToModel(turnManager: TurnManager): TurnManagerModel {
    const players = turnManager.getPlayers();

    const currentTurn = turnManager.getCurrentTurn();

    return {
        players,
        currentTurn
    }
}

