const express = require('express');
const Post = require('../model/post');

exports.postWork = (req, res, next) => {
  const {title, category, imageUrl, description, price} = req.body;
  if(title && category && imageUrl && description && price){
    const post = new Post({
      title: title,
      category: category,
      imageUrl: imageUrl,
      description: description,
      price: price,
      poster: req.params.userId
    })

    post.save()
    .then(() =>{
      console.log("success!");
      return res.status(200).json({ messege: "Success to creat work post", postId : post._id})
    });

  }else{
    console.log("Missing input");
  }
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
