const express = require('express');
const { handleCreateNewUser } = require('../controllers/auth');
const router = express.Router();
//Routes
router.post('/signup',handleCreateNewUser);


module.exports = router;