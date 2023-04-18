const express = require('express');
const User = require('../model/user');


exports.getSignIn = (req, res, next) => {
  console.log('hello');
  res.render('auth/signin');
}

exports.postSignIn = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if(name && email && password){
    let user = new User({
      name: name,
      email: email,
      password: password
    })
    console.log(user);
    user.save();
    res.redirect('/');
  }else{
    console.log('missing email or address');
    res.redirect('/');
  }
}

exports.getLogin = (req, res, next) =>{
  res.render('auth/login');
}

exports.postLogin = (req, res, next) =>{
  const email = req.body.email;
  const password = req.body.password;
  if(email && password){
    User.findOne({email: email})
    .then(user => {
      if(user.password = password){
        console.log('found your account');
        console.log(user);
        res.render('/');
      }else{
        console.log('wrong password');
        console.log(user);
        res.render('/');
      }
    })
    .catch(err => {
      console.log(err);
      res.render('/');
    })

  }else{
    console.log('not good');
    res.redirect('/');
  }
}

exports.getEditUser = (req, res, next) => {
  res.render('auth/edit-user', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password
  });
}

exports.postEditUser = async (req, res, next) =>{
  let currentUser = req.user;
  currentUser.name = req.body.name;
  currentUser.email = req.body.email;
  currentUser.password = req.body.password;

  const updated = await currentUser.save();
  res.render('auth/user', {
      name: req.user.name,
      email: req.user.email,
      password: req.user.password,
    })
}

exports.userInfo = (req, res, next) => {
  res.render('auth/user', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password,
  });
}
