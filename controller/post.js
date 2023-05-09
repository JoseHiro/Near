const express = require('express');
const Post = require('../model/post');
const User = require('../model/user');

exports.postWork = async (req, res, next) => {
  let errorFields = [];
  const { title, category, imageUrl, description, price } = req.body;

  if(!title) errorFields.push('title');
  if(!category) errorFields.push('category');
  if(!imageUrl) errorFields.push('imageUrl');
  if(!description) errorFields.push('description');
  if(!price) errorFields.push('price');

  if(errorFields.length > 0){
    return res.status(400).json({ message: 'Fill in all the fields', errorFields });
  }

  const post = new Post({
    title: title,
    category: category,
    imageUrl: imageUrl,
    description: description,
    price: price,
    poster: req.userId
  })

  post = await post.save();
  if(!post){
    return res.status(400).json({ messege: "Failed for some reason" })
  }

  return res.status(200).json({ messege: "Success to creat work post", postId : post._id})
}

exports.getAllPosts = (req, res, next) => {
  Post.find({})
  .then(posts =>{
    res.status(200).json({posts: posts})
  })
}

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  let getPost = await Post.findById(postId).populate('poster');
  if(!getPost){
    return res.status(400).json({ message: "Didn't find the post" })
  }
  const {name, _id} = getPost.poster;
  const post = {
    id: getPost._id.toString(),
    title: getPost.title,
    imageUrl: getPost.imageUrl,
    category: getPost.category,
    description: getPost.description,
    price: getPost.price,
    postId: _id.toString(),
    poster: name,
  }

  return res.status(200).json({ message: 'Found post', post: post });
}

exports.getEditPost = async(req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
    if(!post){
      return res.status(400).json({message: "Something went wrong"})
    }

  await post.save();
  return res.status(200).json({ message: "Found post", post})
}

exports.postEditPost = async (req, res, next) => {
  let errorFields = [];
  const {title, category, imageUrl, description, price } = req.body;

  if(!title) errorFields.push('title');
  if(!category) errorFields.push('category');
  if(!imageUrl) errorFields.push('imageUrl');
  if(!description) errorFields.push('description');
  if(!price) errorFields.push('price');

  if(errorFields.length > 0){
    return res.status(400).json({ message: 'Fill in all the fields', errorFields });
  }

  const postId = req.params.postId;
  let post = await Post.findById(postId)
  if(!post){
    return res.status(400).json({message: "No post was found to update"})
  }

  post.title = title;
  post.category = category;
  post.imageUrl = imageUrl;
  post.description = description;
  post.price = price;

  await post.save();
  return res.status(200).json({message: 'Success updating!'})
}

exports.deletePost = (req, res, next) => {

}
