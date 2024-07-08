const express = require('express');
const { handleCreateNewQuestion, handleViewAllQuestion } = require('../controllers/quizQuestions');
const router = express.Router();
//Routes
router.post('/questions',handleCreateNewQuestion);
router.get('/total-questions',handleViewAllQuestion);

module.exports = router;