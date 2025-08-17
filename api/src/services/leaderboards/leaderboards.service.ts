import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { ScoreDto } from "src/dtos/score.dto";
import { Score } from "src/models/score.model";

@Injectable()
export class LeaderboardsService {
    constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

    async getLeaderboards(offset: number): Promise<ScoreDto[]> {
        const sortPipeline: PipelineStage = {
            $sort: {
                score: -1
            }
        };

        const limitPipeline: PipelineStage = {
            $limit: offset
        };

        const leaderboards = this.scoreModel.aggregate([sortPipeline, limitPipeline]);

        const leaderboardsDtos: ScoreDto[] = (await leaderboards).map(({ playerId, score }) => {
            return {
                playerId,
                score
            };
        });

        return leaderboardsDtos;
    }
}
