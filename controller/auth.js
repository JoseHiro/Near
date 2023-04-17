const express = require('express')

exports.getSignIn = (req, res, next) => {
  res.render('auth/sign-in');
}

exports.postSignIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  console.log('hello');
}
