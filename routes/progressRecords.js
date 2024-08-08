const express = require('express');
const { handleProgressRecords, handleIndvidualProgressRecord } = require('../controllers/progressRecords');
const router  = express.Router();

//Routes
router.post('/progressRecords',handleProgressRecords)
router.post('/individualRecords',handleIndvidualProgressRecord)

module.exports = router;