const express = require('express');
const { handleCreateNewUser } = require('../controllers/auth');
const router = express.Router();
//Routes
router.get('/',handleCreateNewUser);

module.exports = router;