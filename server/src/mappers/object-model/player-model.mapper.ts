import { Player } from "../../core/player/player";
import { PlayerModel } from "../../models/player.model";
import { mapBoardToModel } from "./board-model.mapper";

export function mapPlayerToModel(player: Player): PlayerModel {
    const playerBoard = player.getBoard();
    const id = player.getId();

    const board = mapBoardToModel(playerBoard);

    return {
        id, 
        board
    }
}
