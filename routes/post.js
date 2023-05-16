const express = require('express');
const router = express.Router();
const workController = require('../controller/post');
const isAuth = require('../middleware/is-auth')

router.post('/user/post-work/:userId', isAuth, workController.postWork);

router.get('/posts', workController.getAllPosts);
router.get('/post/:postId', isAuth, workController.getPost);

router.get('/post/edit/:postId', workController.getEditPost);
router.put('/post/edit/:postId', workController.postEditPost);

router.get('/user/posts', isAuth, workController.getUserPost)

router.delete('/post/delete', isAuth, workController.deletePost);

router.get('/posts/search/:keyWord', workController.searchPost)


module.exports = router;
