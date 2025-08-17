export enum RoomMemberState {
    Waiting = "waiting",
    Ready = "ready",
    InGame = "in-game"
}

export interface RoomMemberDto {
    playerId: string;
    state: RoomMemberState;
}
