const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');
const { check } = require('express-validator');

router.post('/signin',
 [
  check('name')
    .trim()
    .isAlpha()
    .withMessage('You can only use Alphabet'),
  check('email', 'Use a valid email')
    .trim()
    .isEmail()
    .withMessage('Provide a valid Email'),
  check('password')
    .trim()
    .isAlphanumeric()
    .isLength({ min : 8})
    .withMessage('Password needs more than 8 letters with alphabet and numeric characters')
 ],
  authController.postSignIn
);

router.post('/login',
 [
  check('email'),
  check('password')
 ],
authController.postLogin);

// router.get('/user/edit-profile/:userId', authController.getEditProfileUser)
router.put('/user/edit-profile/:userId', authController.postEditProfileUser)

router.get('/user/edit', isAuth, authController.getEditUser);
router.put('/user/edit', isAuth, authController.postEditUser);

router.delete('/user/delete/:userId', authController.deleteUser)
router.get('/user', authController.userInfo);

module.exports = router;
