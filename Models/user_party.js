import mongoose from "mongoose";
import User from '../Models/user.js';
import Party from '../Models/party.js';

const { Schema, model } = mongoose;
const user_partySchema = new Schema(
    {
        user: {
            type: String,
            required: true
        },
        party: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model("UserParty", user_partySchema);