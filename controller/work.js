const express = require('express');
const Work = require('../model/work');

exports.postWork = (req, res, next) => {
  const {title, category, imageUrl, description, price} = req.body;
  if(title && category && imageUrl && description && price){
    const work = new Work({
      title: title,
      category: category,
      imageUrl: imageUrl,
      description: description,
      price: price,
      poster: req.params.userId
    })

    work.save()
    .then(() =>{
      console.log("success!");
      return res.status(200).json({ messege: "Success to creat work post", workId : work._id})
    });

  }else{
    console.log("Missing input");
  }
}
