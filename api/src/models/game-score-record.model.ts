import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class PlayerScoreRecord {
    @Prop({
        required: true
    })
    playerId: string;

    @Prop({
        required: true,
        default: 0
    })
    delta: number;

    @Prop({
        required: true,
        default: 0
    })
    newScore: number;
}

export const PlayerScoreRecordSchema = SchemaFactory.createForClass(PlayerScoreRecord);

@Schema({
    collection: "records"
})
export class GameScoreRecord {
    @Prop({
        required: true,
        default: Date.now()
    })
    createdAt: number;

    @Prop({
        required: true
    })
    roomId: string;

    @Prop({
        required: true,
        default: [],
        type: [PlayerScoreRecordSchema]
    })
    playerScoreRecords: PlayerScoreRecord[];
}

export const GameScoreRecordSchema = SchemaFactory.createForClass(GameScoreRecord);
