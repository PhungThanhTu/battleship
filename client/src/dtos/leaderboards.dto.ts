export interface ScoreDto {
    playerId: string;
    score: number;
}

export type LeaderboardsDto = ScoreDto[];
