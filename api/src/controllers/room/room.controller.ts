import { Request, Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { PlayerInRoomService, RoomByPlayerIdResponseDto } from "src/services/player-in-room.service";

@Controller("room")
export class RoomController {
    constructor(private playerInRoomService: PlayerInRoomService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getRoomIdBy(@Request() req): Promise<RoomByPlayerIdResponseDto> {
        const { username } = req.user;
        console.log(username);
        return await this.playerInRoomService.getRoomIdByPlayerId(username);
    }
}
