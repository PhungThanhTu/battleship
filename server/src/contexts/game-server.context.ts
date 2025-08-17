import { IdEventRegistryHandler } from "../handlers/id-event-registry.handler";
import { IdSocketRegistryHandler } from "../handlers/id-socket-registry.handler";
import { PlayerIdBasedTimedEventHandler } from "../handlers/player-id-based-timed-event.handler";
import { RoomRegistryHandler } from "../handlers/room-registry.handler";


export class GameServerContext {
    
    constructor(
        private idEventRegistry: IdEventRegistryHandler,
        private idSocketRegistry: IdSocketRegistryHandler,
        private roomRegistry: RoomRegistryHandler,
        private playerIdBasedTimedEvent: PlayerIdBasedTimedEventHandler
    ) {
    }

    getIdEventRegistry() {
        return this.idEventRegistry;
    }

    getIdSocketRegistry() {
        return this.idSocketRegistry;
    }

    getRoomRegistry() {
        return this.roomRegistry;
    }

    getPlayerIdBasedTimedEventHandler() {
        return this.playerIdBasedTimedEvent;
    }

}