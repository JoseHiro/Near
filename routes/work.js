const express = require('express');
const router = express.Router();
const workController = require('../controller/work');

router.post('/user/post-work/:userId', workController.postWork);

module.exports = router;
