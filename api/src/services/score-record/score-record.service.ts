import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameScoreRecordDto } from "src/dtos/game-score-record.dto";
import { PlayerScoreRecordDto } from "src/dtos/player-score-record.dto";
import { GameScoreRecord } from "src/models/game-score-record.model";

@Injectable()
export class ScoreRecordService {
    constructor(@InjectModel(GameScoreRecord.name) private gameScoreRecordModel: Model<GameScoreRecord>) {}

    async getScoreRecordForRoom(roomId: string): Promise<GameScoreRecordDto> {
        const gameScoreRecord = await this.gameScoreRecordModel.findOne({
            roomId
        });

        if (!gameScoreRecord) throw new NotFoundException();

        return gameScoreRecord;
    }

    async getScoreRecordForPlayer(playerId: string, roomId: string): Promise<PlayerScoreRecordDto> {
        const gameScoreRecord = await this.gameScoreRecordModel.findOne({
            roomId
        });

        if (!gameScoreRecord) throw new NotFoundException();

        const playerScoreRecords = gameScoreRecord.playerScoreRecords;

        const playerScoreRecord = playerScoreRecords.find((record) => record.playerId === playerId);

        if (!playerScoreRecord) throw new NotFoundException();

        return playerScoreRecord;
    }
}
