import { GameServerContext } from "../../contexts/game-server.context";
import { createRoom, RoomMember } from "../../core/room/room";
import { MemberModel } from "../../models/member.model";
import { RoomModel } from "../../models/room.model";
import { mapModelToGame } from "./model-game.mapper";

export function mapModelToRoom(roomModel: RoomModel, context: GameServerContext) {
    const id = roomModel.id;
    const state = roomModel.state;
    const game = mapModelToGame(context, roomModel.game);
    const members = roomModel.members.map(member => mapModelToRoomMember(member)); 

    return createRoom(context, id, members, state, game);
}

function mapModelToRoomMember(memberModel: MemberModel): RoomMember {
    const { playerId, state } = memberModel;

    return {
        playerId,
        state
    }
}