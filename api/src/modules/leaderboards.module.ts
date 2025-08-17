import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardsController } from "src/controllers/leaderboards/leaderboards.controller";
import { Score, ScoreSchema } from "src/models/score.model";
import { LeaderboardsService } from "src/services/leaderboards/leaderboards.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
    providers: [LeaderboardsService],
    controllers: [LeaderboardsController]
})
export class LeaderboardsModule {}
