const mongoose  = require("mongoose");//Schema
const categorySchema = new mongoose.Schema(
    {
        category_name: { type: String, required: true },
        category_image:{ type: String, required: true },
        category_color:{ type: String, required: true }
    }
)

// Create a model
const CategoryModal = mongoose.model('quiz-categories', categorySchema);
module.exports = CategoryModal;