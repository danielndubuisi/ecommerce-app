import mongoose from "mongoose";

// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
}, {minimize:false})

// create user model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;