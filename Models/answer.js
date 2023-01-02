import mongoose from "mongoose";


const { Schema, model } = mongoose;
const questionSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        question: {
            type: String,
            required: true
        }
       
    }
)

export default model("Answer", questionSchema);
