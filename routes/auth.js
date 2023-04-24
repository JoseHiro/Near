const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.get('/signin', authController.getSignIn);
router.post('/signin', authController.postSignIn);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
// router.get('/edit-user', authController.getEditUser);
router.get('/user/edit/:userId', authController.getEditUser);
router.post('/edit-user', authController.postEditUser);
router.get('/user', authController.userInfo);

module.exports = router;
