const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getSignIn = (req, res, next) => {
  res.render('auth/signin');
}

exports.postSignIn = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if(name && email && password){
    bcrypt.hash(password, 12)
    .then(hashedPw =>{
      let user = new User({
        name: name,
        email: email,
        password: hashedPw
      })
      return user.save();
    })
    .then(user =>{
      console.log('Successfully creared User');
      res.status(201).json({ message: 'User created!', userId: user.id})
    })
  }else{
    console.log('missing email or address');
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
      loadedUser = user;
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual =>{
      if(!isEqual){
        console.log('wrong password');
      }
      console.log('found your account');
      const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'somesupersecretsecret',
      // { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString()});
    })
    .catch(err => {
      console.log(err);
    })

  }else{
    console.log('not good');
  }
}

exports.getEditUser = (req, res, next) => {
  User.findById(req.params.userId)
  .then(user =>{
    if(!user){
      console.log('Not found');
    }else{
      res.status(200).json({name: user.name, email: user.email, password: user.password})
    }
  })
}

exports.postEditUser = async (req, res, next) =>{
  User.findById(req.params.userId)
  .then(user =>{
    if(!user){
      console.log("No user with that Id");
      return ;
    }else{
      user.name = req.body.name;
      user.email = req.body.email;
      return user;
    }
  })
  .then(user =>{
    if(req.body.password !== user.password && bcrypt.compare(req.body.password, user.password)){
      console.log('update password')
      bcrypt.hash(req.body.password, 12)
      .then(hashedPw =>{ user.password = hashedPw;})
      .then(() =>{ user.save()})
    }else{
      user.save();
    }
    return user;
  })
  .then(user =>{
    console.log(user);
    res.status(201).json({ message: 'Update success!', userId: user.id})
  })
}

exports.userInfo = (req, res, next) => {
  res.render('auth/user', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password,
  });
}

exports.deleteUser = (req, res, next) =>{
  console.log(req.params.userId);
  User.deleteOne({_id: req.params.userId})
  .then(result =>{
    console.log(result);
    res.status(200).json({message: "Deleted"});
  })
}
