const express = require('express');
const { handleProgressDetails } = require('../controllers/progressDetails');
const router  = express.Router();

//Routes
router.post('/progressDetails',handleProgressDetails)

module.exports = router;