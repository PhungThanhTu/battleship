import { AuthenticatedSocket } from "../../socket/middlewares/auth.middleware";

export function subscribeSocket<TEventArgs>(socket: AuthenticatedSocket, subscription: EventSubscription<TEventArgs>) {
    socket.on(subscription.event, subscription.handle)
}

export interface EventSubscription<TEventArgs = undefined> {
    event: string;
    handle: (data?: TEventArgs) => void | Promise<void>;
}