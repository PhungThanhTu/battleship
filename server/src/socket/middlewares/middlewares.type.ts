import { Socket } from "socket.io";

export type SocketMiddleware = (socket: Socket, next: (err?: Error | undefined) => void) => void
export type SocketMiddlewareAsync = (socket: Socket, next: (err?: Error | undefined) => void) => Promise<void>
