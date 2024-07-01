const express = require('express');
const { handleCreateNewQuestion } = require('../controllers/quizQuestions');
const router = express.Router();
//Routes
router.post('/questions',handleCreateNewQuestion);

module.exports = router;