import { Socket, io } from "socket.io-client";
import storage from "../storage/auth.local-storage";

export type EventSubscription<T> = {
    event: string;
    eventHandler: (data: T) => void;
};

export async function createSocketClient(): Promise<SocketClient> {
    const socketClient = new SocketClientImpl();
    const token = storage.getAccessToken();
    await socketClient.initializeSocketWithToken(token);
    return socketClient;
}

export type SocketClient = InstanceType<typeof SocketClientImpl>;

class SocketClientImpl {
    private socket: Socket | null;
    private isDisposed: boolean;

    constructor() {
        this.socket = null;
        this.isDisposed = false;
    }

    async initializeSocketWithToken(token: string | null) {
        return new Promise<void>((resolve, reject) => {
            if (!token) throw new Error("Unauthorized");
            try {
                this.socket = io({
                    transports: ["websocket"],
                    timeout: 3000,
                    reconnectionAttempts: 2,
                    query: {
                        token: token
                    }
                });

                this.socket.on("connect_error", (err: Error) => {
                    this.dispose();
                    return reject(err);
                });

                this.socket.on("connect", () => {
                    return resolve();
                });
            } catch (err) {
                this.dispose();
                return reject(err as Error);
            }
        });
    }

    emit(event: string, ...args: unknown[] | undefined[]) {
        this.socket?.emit(event, ...args);
    }

    subscribe<TEventArgs>(subscription: EventSubscription<TEventArgs>) {
        if (!this.socket) throw new Error("socket must be available to subcribe");

        const { event, eventHandler } = subscription;
        this.socket.on(event, eventHandler);
    }

    unsubscribe(event: string) {
        if (!this.socket) throw new Error("Socket must be disposed after unsubscribe");
        this.socket.off(event);
    }

    dispose() {
        if (this.socket?.connected) {
            console.log("disposed socket ", this.socket.id);
            this.isDisposed = true;
            return this.socket?.close();
        }
    }

    getIsDisposed() {
        return this.isDisposed;
    }

    getSocketId() {
        return this.socket?.id ?? "no socket";
    }
}
