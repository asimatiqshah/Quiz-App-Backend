const express = require('express');
const { handleCreateNewCategory, handleShowCategories } = require('../controllers/quizQuestionCategory');
const router = express.Router();

//Routes
router.post('/categoryAdd',handleCreateNewCategory);
router.get('/categoryShow',handleShowCategories)

module.exports = router;