import { Player, createPlayer } from "../../core/player/player";
import { PlayerModel } from "../../models/player.model";
import { mapModelToBoard } from "./model-board.mapper";

export function mapModelToPlayer(playerModel: PlayerModel): Player {
    const boardModels = playerModel.board;
    const playerId = playerModel.id;

    const board = mapModelToBoard(boardModels);
    return createPlayer(playerId, board);
}
