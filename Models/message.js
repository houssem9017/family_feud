import mongoose from "mongoose";


const { Schema, model } = mongoose;
const gameSchema = new Schema(
    {
        sender: {
            type: String,
            required: true
        },
        party: {
            type: String,
            required: true
        },
        text: {
            type: String,
            default: ""
        }
    }
    , {
        timestamps: true
    }
)

export default model("Message", gameSchema);
