const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');

router.get('/signin', authController.getSignIn);
router.post('/signin', authController.postSignIn);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/user/edit/:userId', authController.getEditUser);
router.put('/user/edit/:userId', isAuth, authController.postEditUser);
router.delete('/user/delete/:userId', authController.deleteUser)
router.get('/user', authController.userInfo);

module.exports = router;
