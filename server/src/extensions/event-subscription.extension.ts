import { EventSubscription } from "../shared/events/event";
import { SocketWrapper } from "../wrappers/socket.wrapper";

declare module "../wrappers/socket.wrapper" {
    interface SocketWrapper {
        subscribe: <TEventArgs>(subscription: EventSubscription<TEventArgs>) => void;
        unsubscribe: (ev: string) => void;
    }
}

SocketWrapper.prototype.subscribe = function<TEventArgs>(subscription: EventSubscription<TEventArgs>) {
    this.on(subscription.event, subscription.handle);
}

SocketWrapper.prototype.unsubscribe = function(ev: string) {
    this.removeAllListeners(ev);
}