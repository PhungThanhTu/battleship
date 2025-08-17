import { RoomMember } from "../core/room/room";

export interface RoomJoinRequestDto {
    roomId: string;
}

export enum RoomState {
    Waiting = "Waiting",
    Started = "Started",
    Ended = "Ended"
}

export interface RoomJoinResponseDto {
    roomId: string;
    playerId: string;

}

export interface RoomFetchRequestDto {
    state: RoomState;
}


export enum RoomMemberState {
    Waiting = "waiting",
    Ready = "ready",
    InGame = "in-game"
}


export type RoomMemberDto = RoomMember;

export interface RoomNotificationResponseDto {
    message: string;
}

export interface RoomFetchResponseDto {
    state: RoomState;
    roomId: string;
    winnerId: string;
    members: RoomMemberDto[] 
}

export interface RoomEndResponseDto {
    state: RoomState;
    winnerId: string;

}