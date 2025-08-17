import { Controller, Get, Query } from "@nestjs/common";
import { ScoreDto } from "src/dtos/score.dto";
import { LeaderboardsService } from "src/services/leaderboards/leaderboards.service";

const DEFAULT_OFFSET = 20;

@Controller("leaderboards")
export class LeaderboardsController {
    constructor(private leaderboardsService: LeaderboardsService) {}

    @Get()
    async getScoreLeaderboards(@Query("offset") offset?: string): Promise<ScoreDto[]> {
        let formattedOffset = DEFAULT_OFFSET;
        const parsedOffset = parseInt(offset);

        if (!isNaN(parsedOffset)) {
            formattedOffset = parsedOffset;
        }

        const scores = await this.leaderboardsService.getLeaderboards(formattedOffset);
        return scores;
    }
}
