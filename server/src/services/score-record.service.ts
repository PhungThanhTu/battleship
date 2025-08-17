import { GameScoreRecord } from "../models/game-score-record.model";
import { PlayerScoreRecord } from "../models/player-score-record.model";
import ScoreModel from "../models/score.model";
import GameScoreRecordModel from "../schema/game-score-record.schema";

interface ScoreCalculationSetting {
    winnerDelta: number;
    delta: number
}
const defaultScoreCalculationSetting: ScoreCalculationSetting = {
    winnerDelta: 10,
    delta: 0
}

export interface GameResult {
    roomId: string;
    winnerId: string;
    playerIds: string[]
}

export async function storeScoreRecordAndUpdateScoreUsingDefaultSetting(result: GameResult) {
    await storeScoreRecordAndUpdateScore(result, defaultScoreCalculationSetting);
}

async function storeScoreRecordAndUpdateScore(result: GameResult, setting: ScoreCalculationSetting) {
    const { playerIds, roomId } = result;
    const playerRecords = []

    for (const playerId of playerIds) {
        const playerRecord = await updatePlayerScoreAndGetRecord(playerId, result, setting);
        playerRecords.push(playerRecord); 
    }

    const newGameRecord: GameScoreRecord = {
        roomId,
        playerScoreRecords: playerRecords,
        createdAt: Date.now()
    }

    const newGameRecordModel =  new GameScoreRecordModel(newGameRecord);
    await newGameRecordModel.save();
}


async function updatePlayerScoreAndGetRecord(playerId: string, gameResult: GameResult, setting: ScoreCalculationSetting): Promise<PlayerScoreRecord> {
    let playerScore = await ScoreModel.findOne({
        playerId: playerId
    });

    if (!playerScore) {
        playerScore = new ScoreModel({
            playerId,
            score: 0
        })
    }

    const winnerId = gameResult.winnerId;
    const isWinner = playerId == winnerId

    const delta = isWinner 
        ? setting.winnerDelta
        : setting.delta;

    playerScore.score += delta;
    playerScore.updatedAt = Date.now();

    await playerScore.save();

    const newScore = playerScore.score

    return {
        playerId,
        newScore,
        delta
    }
}