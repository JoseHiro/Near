const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');


exports.getSignIn = (req, res, next) => {
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
    res.status(201).json({ message: 'User created!', userId: user.id})
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
  let loadedUser;
  if(email && password){
    User.findOne({email: email})
    .then(user => {
      if(user.password = password){
        console.log('found your account');
        console.log(user);

        loadedUser = user;

        const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      }else{
        console.log('wrong password');
        console.log(user);
      }
    })
    .catch(err => {
      console.log(err);
    })

  }else{
    console.log('not good');
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
