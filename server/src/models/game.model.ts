import { PlayerModel } from "./player.model";
import { TurnManagerModel } from "./turn-manager.model";
export interface GameModel {
    players: PlayerModel[],
    turnManager: TurnManagerModel
}
