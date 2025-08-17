import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ScoreDocument = HydratedDocument<Score>;

@Schema()
export class Score {
    @Prop({
        required: true,
        default: Date.now()
    })
    createdAt: number;

    @Prop({
        required: true,
        default: Date.now()
    })
    updatedAt: number;

    @Prop({
        required: true
    })
    playerId: string;

    @Prop({
        required: true,
        default: 0
    })
    score: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
