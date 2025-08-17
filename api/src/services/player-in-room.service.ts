import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlayerInRoom } from "src/models/player-in-room.model";

@Injectable()
export class PlayerInRoomService {
    constructor(@InjectModel(PlayerInRoom.name) private playerInRoomModel: Model<PlayerInRoom>) {}

    async getRoomIdByPlayerId(playerId: string): Promise<RoomByPlayerIdResponseDto> {
        const playerInRoom = await this.playerInRoomModel.findOne({
            playerId
        });

        if (!playerInRoom) throw new NotFoundException();

        return {
            roomId: playerInRoom.roomId
        };
    }
}

export type RoomByPlayerIdResponseDto = {
    roomId: string;
};
