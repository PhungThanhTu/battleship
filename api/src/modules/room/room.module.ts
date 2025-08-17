import { Module } from "@nestjs/common";
import { AuthConfigModule } from "../auth-config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PlayerInRoom, PlayerInRoomSchema } from "src/models/player-in-room.model";
import { PlayerInRoomService } from "src/services/player-in-room.service";
import { RoomController } from "src/controllers/room/room.controller";

@Module({
    imports: [AuthConfigModule, MongooseModule.forFeature([{ name: PlayerInRoom.name, schema: PlayerInRoomSchema }])],
    providers: [PlayerInRoomService],
    controllers: [RoomController]
})
export class RoomModule {}
