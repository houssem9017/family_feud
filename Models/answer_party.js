import mongoose from "mongoose";


const { Schema, model } = mongoose;
const answer_partySchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        party: {
            type: String,
            required: true
        },
        answered: {
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default:30
        },
    }
)

export default model("Answer_Party", answer_partySchema);
