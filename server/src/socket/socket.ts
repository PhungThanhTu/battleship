import { Server as HttpServer } from "http";
import { Pool } from "../core/pool/pool";
import { createWrappedIoServer } from "../wrappers/io.wrapper";
import { RoomRegistryHandler } from "../handlers/room-registry.handler";
import { IdSocketRegistryHandler } from "../handlers/id-socket-registry.handler";
import { IdEventRegistryHandler } from "../handlers/id-event-registry.handler";
import { GameServerContext } from "../contexts/game-server.context";
import "../extensions/io-event.extensions";
import { RoomServiceRepository } from "../services/room.service";
import { PlayerInRoomRepository } from "../services/player-in-room.service";
import { PlayerIdBasedTimedEventHandler } from "../handlers/player-id-based-timed-event.handler";

export function createGameSocketServer(server: HttpServer) {
    const io = createWrappedIoServer(server, {
        connectionStateRecovery: {
            skipMiddlewares: true,
            maxDisconnectionDuration: 1000,
        },
        pingInterval: 2000,
        pingTimeout: 5000,
        transports: ["websocket"],
        cors: {
            origin: "*"
        }
    });

    const socketRegisty = new IdSocketRegistryHandler();
    const eventRegistry = new IdEventRegistryHandler(socketRegisty);
    const playerTimedEventHandler = new PlayerIdBasedTimedEventHandler();
    const roomRepository = new RoomServiceRepository();
    const playerInRoomRepository = new PlayerInRoomRepository();
    const roomRegistry = new RoomRegistryHandler(io, socketRegisty, roomRepository, playerInRoomRepository);
    const serverContext = new GameServerContext(eventRegistry, socketRegisty, roomRegistry, playerTimedEventHandler);
    roomRepository.setContext(serverContext);

    const pool = new Pool(serverContext);
    pool.initializeBaseEventsForIo(io);    
}