import mongoose from "mongoose";


const { Schema, model } = mongoose;
const gameSchema = new Schema(
    {
        blueTeam: {
            type: String,
            required: true
        },
        redTeam: {
            type: String,
            required: true
        },
        winner: {
            type: String,
            default: "none"
        },
        finished: {
            type: Boolean,
            default: false
        }
    }
,{
    timestamps: true
}
)

export default model("Game", gameSchema);
