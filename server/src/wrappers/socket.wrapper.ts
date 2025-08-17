import { Socket } from "socket.io";
import { AuthenticatedSocket } from "../socket/middlewares/auth.middleware";

export class SocketWrapper {
    private authenticatedSocket: AuthenticatedSocket;
    private events: string[];

    constructor(socket: Socket) {
        if (!(socket as AuthenticatedSocket).user.username) {
            throw new Error("socket must be authenticated") ;
        }
        this.events = []
        this.authenticatedSocket = socket as AuthenticatedSocket;
        this.authenticatedSocket.on("disconnect", () => {
            console.log("socket level disconnection ", this.getSocketId());
        })
    }

    on(ev: string, listeners: (...args: any[]) => void) {
        this.events.push(ev);
        console.log(this.getSocketId(), 'registered event ', ev);
        this.authenticatedSocket.on(ev, listeners);
    }

    removeAllListeners(ev: string) {
        this.events = this.events.filter(event => event === ev);
        this.authenticatedSocket.removeAllListeners(ev);
    }

    removeAllEvents() {
        this.events.forEach(ev => this.removeAllListeners(ev));
        this.events = []
    }

    getSocket() {
        return this.authenticatedSocket;
    }

    emit(ev: string, ...args: any[]) {
        return this.authenticatedSocket.emit(ev, ...args);
    }

    emitBoardcastToRoom(roomId: string, ev: string, ...args: any[]) {
        return this.authenticatedSocket.broadcast.to(roomId).emit(ev, ...args);
    }

    join(rooms: string | string[]) {
        return this.authenticatedSocket.join(rooms);
    }

    getSocketId() {
        return this.getSocket().id;
    }

    debug() {
        return this.getSocket().rooms;
    }

    disconnect() {
        return this.getSocket().disconnect();
    }

    async leave(room: string) {
        return await this.authenticatedSocket.leave(room)
    }
}