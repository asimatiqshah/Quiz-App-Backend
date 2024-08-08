const mongoose  = require("mongoose");//Schema
const ProgressSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        attempted_questions: { type: String, required: true },
        score_secured: { type: String, required: true },
        time_spend: { type: String,required: true },
        status: { type: String, required: true },
        createdAt: { type: String, required: true },
    }
)
// Create a model
const ProgressModal = mongoose.model('progress-records', ProgressSchema);
module.exports = ProgressModal;