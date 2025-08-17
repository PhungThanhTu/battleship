import { Schema } from "mongoose";
import { MemberModel } from "../models/member.model";

export const memberSchema = new Schema<MemberModel>({
    playerId: { type: String, required: true },
    state: { type: String, required: true }
});
