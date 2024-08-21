const mongoose  = require("mongoose");//Schema
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        role: { type: String, required: true },
        userimage:{ type: String },
        createdAt: { type: String, required: true },
        vistedHistory: { type: Array, required: true },
    }
)

// Create a model
const AuthModal = mongoose.model('user-details', userSchema);

module.exports = AuthModal;
