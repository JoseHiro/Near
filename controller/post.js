const express = require('express');
const Post = require('../model/post');

exports.postWork = async (req, res, next) => {
  let emptyFields = [];
  const { title, category, imageUrl, description, price } = req.body;

  if(title) emptyFields.push('title');
  if(category) emptyFields.push('category');
  if(imageUrl) emptyFields.push('imageUrl');
  if(description) emptyFields.push('description');
  if(price) emptyFields.push('price');

  if(emptyFields.length > 0){
    res.status(400).json({ message: '', emptyFields });
  }

  const post = new Post({
    title: title,
    category: category,
    imageUrl: imageUrl,
    description: description,
    price: price,
    poster: req.params.userId
  })

  post = await post.save();
  if(!post){
    res.status(400).json({ messege: "Failed for some reason" })
  }

  return res.status(200).json({ messege: "Success to creat work post", postId : post._id})
}

exports.getAllPosts = (req, res, next) => {
  Post.find({})
  .then(posts =>{
    res.status(200).json({posts: posts})
  })
}

exports.getPost = (req, res, next) => {777
  Post.findById(req.params.postId)
  .then(post =>{
    res.status(200).json({post: post})
  })
}

exports.getEditPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post.findById(postId)
  .then(post => {
    if(!post){
      console.log('No post');
    }
    res.status(200).json({message: "Found post", post: post})
  })
}

exports.postEditPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
  .then(post => {
    if(!post){
      console.log('No post');
    }
    post.title = req.body.title;
    post.category = req.body.category;
    post.imageUrl = req.body.imageUrl;
    post.description = req.body.description;
    post.price = req.body.price;

    return post.save();
  }).then(result => {
    res.status(200).json({message: 'Success updating!'})
  })
}

exports.deletePost = (req, res, next) => {

}
