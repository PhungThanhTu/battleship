import { Controller, Get, Request, Query, UseGuards } from "@nestjs/common";
import { PlayerScoreRecordDto } from "src/dtos/player-score-record.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ScoreRecordService } from "src/services/score-record/score-record.service";

@Controller("score-record")
export class ScoreRecordController {
    constructor(private scoreRecordService: ScoreRecordService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getScoreRecord(@Request() req, @Query("roomId") roomId: string): Promise<PlayerScoreRecordDto> {
        const { username } = req.user;
        return await this.scoreRecordService.getScoreRecordForPlayer(username, roomId);
    }
}
