import { EventSubscription } from "../shared/events/event";
import { SocketWrapper } from "../wrappers/socket.wrapper";
import { IdSocketRegistryHandler } from "./id-socket-registry.handler";
import "../extensions/event-subscription.extension"

export class IdEventRegistryHandler {
    private idToEvents: Map<string, EventSubscription<any>[]>

    constructor(private idSocketHandler: IdSocketRegistryHandler) {
        this.idToEvents = new Map();
    }

    getEventsById(id: string) {
        return this.idToEvents.get(id);
    }

    syncSocket(newSocket: SocketWrapper) {
        this.idSocketHandler.replaceSocket(newSocket);
    }
    
    syncEventWithSocket(newSocket: SocketWrapper) {
        this.syncEvents(newSocket);
    }

    resyncWithSocketByPlayerId(playerId: string) {
        const socket = this.idSocketHandler.getSocketById(playerId);
        if (!socket) return;
        this.unsyncEvent(socket);
        this.syncEvents(socket);
    }

    subscribe<TEventArgs>(id: string, subscription: EventSubscription<TEventArgs>) {
        let events = this.getEventsById(id);
        if (!events) {
            this.initializeEventForId(id);
            events = this.getEventsById(id);
        }
        events?.push(subscription);
        this.syncParticularEventToPlayerSocket<TEventArgs>(id, subscription);
    }

    unsubscribe(id: string, ev: string) {
        const events = this.getEventsById(id);
        if (!events) return;

        const newEvents = events.filter(event => event.event !== ev);
        this.updateEventForId(id, newEvents);
    }

    private updateEventForId(id: string, events: EventSubscription<any>[]) {
        this.idToEvents.set(id, events);
    }

    private initializeEventForId(id: string) {
        this.idToEvents.set(id, []);
    }

    private unsyncEvent(socket: SocketWrapper) {
        return socket.removeAllEvents();
    }

    private syncParticularEventToPlayerSocket<TEventArgs>(playerId: string, subscription: EventSubscription<TEventArgs>) {
        const socket = this.idSocketHandler.getSocketById(playerId);
        if (socket) socket.subscribe<TEventArgs>(subscription);
    }
    
    private syncEvents(newSocket: SocketWrapper) {
        const id = newSocket.getId();
        const events = this.getEventsById(id);

        if (!events || events.length == 0) return;

        events.forEach((event) => {
            newSocket.subscribe(event);
        })
    }

}