import { EventSubscription } from "../shared/events/event";
import { SocketWrapper } from "../wrappers/socket.wrapper";

export class IdSocketRegistryHandler {
    private idToSocket: Map<string, SocketWrapper>;
    private idToEvents: Map<string, EventSubscription<any>[]>

    constructor() {
        this.idToEvents = new Map();
        this.idToSocket = new Map();
    }

    
    emit<TEventArgs = undefined>(id: string, ev: string, args?: TEventArgs) {
        const socket = this.getSocketById(id);
        if (!socket) return;

        socket.emit(ev, args);
    }

    emitBoardcast<TEventArgs = undefined>(id: string, roomId: string, ev: string, args?: TEventArgs) {
        const socket = this.getSocketById(id);
        if (!socket) return;
        socket.debug();
        socket.emitBoardcastToRoom(roomId, ev, args);
    }


    getSocketById(id: string = ""): SocketWrapper | undefined {

        const socket = this.idToSocket.get(id);
        return socket;
    }

    
    replaceSocket(newSocket: SocketWrapper) {
        const id = newSocket.getId();
        const oldSocket = this.getSocketById(id);
        if (oldSocket)  {
            console.log('replace socket ', oldSocket.getSocketId(), ' with socket ', newSocket.getSocketId());
            oldSocket.emit("kicked");
            oldSocket.disconnect();
        }
        this.idToSocket.set(id, newSocket);
    }

    disposeSocket(id: string) {
        return this.idToEvents.delete(id);
    }
}