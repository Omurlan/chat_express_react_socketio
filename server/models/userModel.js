const mongoose = require("mongoose").default

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1000,
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
