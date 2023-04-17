const express = require('express');

exports.error = (req, res, next) =>{
  res.render('error');
}
