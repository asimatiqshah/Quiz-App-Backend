const express = require('express');
const { handleCreateNewUser, handleLoginUser } = require('../controllers/auth');
const router = express.Router();
//Routes
router.post('/signup',handleCreateNewUser);
router.post('/login',handleLoginUser);

module.exports = router;