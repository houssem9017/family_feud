import mongoose from "mongoose";


const { Schema, model} = mongoose;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: { type: String },
        points: {
            type: Number,
            required: true
        },
        rank: {
            type: String,
            default: "bronze"
        }
    },
        {
        timestamps: true
        }
)

export default model("User", userSchema);
