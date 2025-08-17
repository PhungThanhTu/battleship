import { RoomMemberState } from "../dtos/room.dto";

export interface MemberModel {
    playerId: string;
    state: RoomMemberState;
}
