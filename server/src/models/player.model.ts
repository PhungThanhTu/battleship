import { BoardModel } from "./board.model";

export interface PlayerModel {
    id: string;
    board: BoardModel;
}
