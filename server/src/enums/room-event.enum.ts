export enum RoomServerEvent { 
    ROOM_ERROR = "room_error",
    ROOM_FETCH = "room_fetch",
    ROOM_CREATED = "room_created",
    ROOM_JOINED = "room_joined",
    ROOM_END = "room_end",
    ROOM_NOTIFICATION = "room_notification"
}
export enum RoomEvents {
    CREATE = "create_room",
    JOIN = "join_room",
    READY = "ready_room",
    QUIT = "quit_room"
}

export enum RoomTimedEvents {
    LONG_DISCONNECTION = "long_disconnection",
    INACTIVITY = "inactivity"
}

