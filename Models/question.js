import mongoose from "mongoose";


const { Schema, model } = mongoose;
const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        }
    }
)

export default model("Question", questionSchema);
