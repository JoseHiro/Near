const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.postSignIn = async (req, res, next) => {
  let result = validationResult(req);
  let errorFields = [];

  if (!result.isEmpty()){
    errorMessages = result.array()[0].msg;
    errorFields = result.array()[0].path;
    return res.status(400).json({ message: errorMessages, errorFields });
  }

  const { name, email, password } = req.body;

  if(!name) errorFields.push('name');
  if(!email) errorFields.push('email');
  if(!password) errorFields.push('password');

  if(errorFields.length > 0){
    return res.status(400).json({ message: 'Please fill in the fields', errorFields});
  }

  try{
    const hashedPw = await bcrypt.hash(password, 12);
    let user = new User({ name: name, email: email, password: hashedPw });
    if(!user){
      new Error("Something occured, try again");
    }
    user = await user.save();
    return res.status(201).json({ message: 'Successed to make your account!', userId: user.id});
  }catch(error){
    return res.status(400).json({ message: error });
  }
}

exports.postLogin = (req, res, next) =>{
  const {email, password} = req.body;

  let loadedUser;
  let errorFields = [];

  if(!email) errorFields.push('email');
  if(!password) errorFields.push('password');
  if(errorFields.length > 0){
    console.log(errorFields);
    return res.status(400).json({ message: 'Please fill in all the fields', errorFields})
  }

  User.findOne({email: email})
  .then(user => {
    if(!user){
      res.status(400).json({message: 'No account exist with that email'});
    }
    loadedUser = user;
    return bcrypt.compare(password, user.password)
  })
  .then(isEqual =>{
    if(!isEqual){
      console.log("Wrong password");
      return res.status(400).json({message: 'Wrong Password'});
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
    return res.status(200).json({ token: token, userId: loadedUser._id.toString()});
  })
  .catch(err => {
    res.status(400).json({ message: err});
  })
}

exports.getEditUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if(!user){
    return res.status(400).json({message: 'No user found'})
  }else{
    res.status(200).json({message: 'Found user', user})
  }
}

exports.postEditUser = async (req, res, next) =>{
  let errorFields = [];
  const {name, email, password} = req.body;

  if(!name) errorFields.push('name');
  if(!email) errorFields.push('email');
  if(!password) errorFields.push('password');
  if(errorFields.length > 0){
    console.log('hello');
    return res.status(400).json({ message: "Don't leave an empty space", errorFields });
  }

  let user = await User.findById(req.userId);

  if(!user){
    return res.status(400).json({ message: "An issued occured! No User found" })
  }
  user.name = name;
  user.email = email;
  if(password !== user.password && bcrypt.compare(password, user.password)){
    console.log('update password')
    const hashwePw = await bcrypt.hash(password, 12);
  }

  user.save();
  return res.status(201).json({ message: 'Updated', userId: user.id});
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
