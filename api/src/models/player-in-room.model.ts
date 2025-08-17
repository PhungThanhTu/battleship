import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PlayerInRoomDocument = HydratedDocument<PlayerInRoom>;

@Schema()
export class PlayerInRoom {
    @Prop({
        required: true,
        type: String
    })
    playerId: string;

    @Prop({
        required: true,
        type: String
    })
    roomId: string;
}

export const PlayerInRoomSchema = SchemaFactory.createForClass(PlayerInRoom);
