import { PlayerScoreRecordDto } from "./player-score-record.dto";

export interface GameScoreRecordDto {
    roomId: string;
    createdAt: number;
    playerScoreRecords: PlayerScoreRecordDto[];
}
