import { RoomMemberDto } from "./room-member.dto";

export enum RoomState {
    Waiting = "Waiting",
    Started = "Started",
    Ended = "Ended",
    Unknown = "Unknown"
}

export interface RoomFetchResponseDto {
    state: RoomState;
    roomId: string;
    winnerId: string;
    members: RoomMemberDto[];
}

export interface RoomEndResponseDto {
    state: RoomState;
    winnerId: string;
}

export interface RoomNotificationResponseDto {
    message: string;
}

export interface RoomErrorMessage {
    message: string;
}

export interface RoomByPlayerIdResponseDto {
    roomId: string;
}

export interface RoomCreatedResponseDto {
    message: string;
    roomId: string;
}
