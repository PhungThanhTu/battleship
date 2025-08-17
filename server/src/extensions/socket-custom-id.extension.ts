import { SocketWrapper } from "../wrappers/socket.wrapper";

declare module "../wrappers/socket.wrapper" {
    interface SocketWrapper {
        getId : () => string;
    }
}

SocketWrapper.prototype.getId = function () {
    return this.getSocket().user.username;
}