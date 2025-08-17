import { GameModel } from "./game.model";
import { RoomState } from "../dtos/room.dto";
import { MemberModel } from "./member.model";

export interface RoomModel {
    id: string;
    members: MemberModel[];
    state: RoomState;
    game: GameModel | null;
}