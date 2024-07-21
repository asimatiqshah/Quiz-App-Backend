const express = require('express');
const { handleCreateNewUser, handleLoginUser, handleVerifyEmail } = require('../controllers/auth');
const router = express.Router();
//Routes
router.post('/signup',handleCreateNewUser);
router.post('/login',handleLoginUser);
router.post('/verifyEmail',handleVerifyEmail);

module.exports = router;