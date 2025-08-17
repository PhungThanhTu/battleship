import { PlayerScoreRecord } from "./player-score-record.model";

export interface GameScoreRecord {
    roomId: string;
    createdAt: number;
    playerScoreRecords: PlayerScoreRecord[]
}