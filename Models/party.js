import mongoose from "mongoose";

const { Schema, model } = mongoose;
const partySchema = new Schema(
    {
        started: {
            type: Number,
            default: 0
        },
        total_points: {
            type: Number,
            default: 0
        },
        wrong_answers: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export default model("Party", partySchema);