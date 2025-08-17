import { Socket } from "socket.io";
import { IoWrapper } from "../wrappers/io.wrapper";
import { SocketWrapper } from "../wrappers/socket.wrapper";

declare module "../wrappers/io.wrapper" {
    interface IoWrapper {
        subscribeConnect: (listeners: (socket: SocketWrapper) => void) => void;  
    }
}

IoWrapper.prototype.subscribeConnect = function (listeners: (socket: SocketWrapper) => void) {
    this.on("connection", (baseSocket: Socket) => {
        const wrapper = new SocketWrapper(baseSocket);
        listeners(wrapper);
    })
}
