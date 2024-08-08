const express = require('express');
const { handleCreateNewUser, handleLoginUser, handleVerifyEmail, handleUserIndvidual } = require('../controllers/auth');
const router = express.Router();
//Routes
router.post('/signup',handleCreateNewUser);
router.post('/login',handleLoginUser);
router.post('/verifyEmail',handleVerifyEmail);
router.post('/userIndividualDetail',handleUserIndvidual);

module.exports = router;