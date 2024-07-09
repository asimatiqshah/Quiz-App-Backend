const mongoose  = require("mongoose");//Schema
const questionSchema = new mongoose.Schema(
    {
        quiz_title: { type: String, required: true },
        question: { type: String, required: true },
        options: { type: Array, required: true },
        image: { type: String },
        category_id: { type: String,required: true },
        question_marks: { type: String, required: true },
        is_correct: { type: Array, required: true },
        createdAt: { type: String, required: true },
    }
)

// Create a model
const QuestionModal = mongoose.model('quiz-questions', questionSchema);
module.exports = QuestionModal;