import { Server, ServerOptions, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { SocketMiddleware, SocketMiddlewareAsync } from "../socket/middlewares/middlewares.type";
import { applySocketMiddleware } from "../socket/middlewares";


export function createWrappedIoServer(server: HttpServer, opts?: Partial<ServerOptions>) {
    const concreteIoServer = new Server(server, opts);

    const io = new IoWrapper(concreteIoServer);

    applySocketMiddleware(io);
    
    return io;
}

export class IoWrapper {
    constructor(private io: Server) {}

    on(ev: string, listeners: (socket: Socket) => void) {
        return this.io.on(ev, listeners);
    }

    off(ev: string) {
        return this.io.removeAllListeners(ev);
    }

    use(middleware: SocketMiddleware | SocketMiddlewareAsync) {
        return this.io.use(middleware);
    }
    
    emitToRoom(rooms: string | string[], ev: string, ...args: any[]) {
        return this.io.to(rooms).emit(ev, ...args);
    }

    debug(room: string) {
        console.log(this.io.sockets.adapter.rooms.get(room));
    }
}