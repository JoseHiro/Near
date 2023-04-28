const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./model/user');


const mongoDb = process.env.MONGO_DB_PASS;

// Routes
const authRoute = require('./routes/auth');
const wotkRoute = require('./routes/work');

//controller
const errorController = require('./controller/error');

// app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json());

// middleware to sumbit user info
app.use((req, res, next) => {
  User.findById('643dd1dc4e16ace7a350aeeb')
  .then(user =>{
    req.user = user;
    next();
  })
})

app.get("/api", (req, res, next) => {
  res.json({ "users": ["Mike", "userTwo", "userThree" ]})
})

app.use(authRoute);
app.use(wotkRoute);
app.get('/', (req, res) => {
    res.render('index');
})


app.use(errorController.error);

mongoose
.connect(mongoDb)
.then(result => {
  app.listen(8080);
})
.catch(err =>{
  console.log(err);
});
