const express = require('express');
const { handleCreateNewCategory } = require('../controllers/quizQuestionCategory');
const router = express.Router();

//Routes
router.post('/categoryAdd',handleCreateNewCategory);

module.exports = router;