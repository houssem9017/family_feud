import mongoose from "mongoose";


const { Schema, model } = mongoose;
const question_partySchema = new Schema(
    {
        question: {
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
        }
    }
)

export default model("Question_Party", question_partySchema);
