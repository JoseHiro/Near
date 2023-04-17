const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.get('/sign-in', authController.getSignIn);
router.post('/sign-in', authController.postSignIn);

module.exports = router;

