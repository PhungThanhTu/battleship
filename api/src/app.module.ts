import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth.module";
import { MongoModule } from "./modules/mongo.module";
import { LeaderboardsModule } from "./modules/leaderboards.module";
import { ScoreRecordModule } from "./modules/score-record.module";
import { RoomModule } from "./modules/room/room.module";
@Module({
    imports: [AuthModule, MongoModule, LeaderboardsModule, ScoreRecordModule, RoomModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
