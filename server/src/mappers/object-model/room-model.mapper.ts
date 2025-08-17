import { Room, RoomMember } from "../../core/room/room";
import { RoomModel } from "../../models/room.model";
import { mapGameToModel } from "./game-model.mapper";

export function mapRoomToModel(room: Room): RoomModel {
    const id = room.getId();
    const members = room.getMembers().map(member => mapMemberToModel(member));
    const state = room.getState();
    const concreteGame = room.getGame();
    const game = concreteGame
        ? mapGameToModel(concreteGame)
        : null;

    return {
        id,
        members,
        state,
        game
    }
}

function mapMemberToModel(member: RoomMember) {
    const playerId = member.playerId;
    const state = member.state;

    return {
        playerId,
        state
    }
}