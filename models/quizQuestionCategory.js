const mongoose  = require("mongoose");//Schema
const categorySchema = new mongoose.Schema(
    {
        category_name: { type: String, required: true },
    }
)

// Create a model
const CategoryModal = mongoose.model('quiz-questions', categorySchema);
module.exports = CategoryModal;