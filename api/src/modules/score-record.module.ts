import { Module } from "@nestjs/common";
import { ScoreRecordController } from "src/controllers/score-record/score-record.controller";
import { ScoreRecordService } from "src/services/score-record/score-record.service";
import { AuthConfigModule } from "./auth-config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { GameScoreRecord, GameScoreRecordSchema } from "src/models/game-score-record.model";

@Module({
    imports: [AuthConfigModule, MongooseModule.forFeature([{ name: GameScoreRecord.name, schema: GameScoreRecordSchema }])],
    providers: [ScoreRecordService],
    controllers: [ScoreRecordController]
})
export class ScoreRecordModule {}
