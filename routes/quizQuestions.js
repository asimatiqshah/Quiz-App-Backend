const express = require("express");
const {
  handleCreateNewQuestion,
  handleViewAllQuestion,
  handleCategoryRelatedQuestion,
} = require("../controllers/quizQuestions");
const router = express.Router();
//Routes
router.post("/add-new-questions", handleCreateNewQuestion);
router.get("/total-questions", handleViewAllQuestion);
router.post("/category-related-questions", handleCategoryRelatedQuestion); // You need to provide category_id to filter data
module.exports = router;
