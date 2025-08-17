import { TurnManager, createTurnManager } from "../../core/turn-manager/turn-manager";
import { TurnManagerModel } from "../../models/turn-manager.model";

export function mapModelToTurnManager(model: TurnManagerModel): TurnManager {
    const { players, currentTurn } = model;
    return createTurnManager(players, {
        firstTurnPlayer: players[currentTurn]
    });
}
