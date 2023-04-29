const express = require('express');
const router = express.Router();
const workController = require('../controller/post');

router.post('/user/post-work/:userId', workController.postWork);
router.get('/posts', workController.getAllPosts);
router.get('/post/:postId', workController.getPost);
router.get('/post/edit/:postId', workController.getEditPost);
router.post('/post/edit/:postId', workController.postEditPost);
router.delete('/post/delete/:postId', workController.deletePost);


module.exports = router;
