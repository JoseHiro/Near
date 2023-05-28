const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const isAuth = require('../middleware/is-auth');

router.get('/chat/members', isAuth, chatController.chatMembers);
router.get('/chat/:recieverId', isAuth, chatController.getChat);
router.post('/message/post', isAuth, chatController.postMessage);


module.exports = router;
