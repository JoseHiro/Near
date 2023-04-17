const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const mongoDb = process.env.MONGO_DB_PASS;

// Routes
const authRoute = require('./routes/auth');

//controller
const errorController = require('./controller/error');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(authRoute);
app.get('/', (req, res) => {
    res.render('index');
})

app.use(errorController.error);
mongoose
.connect(mongoDb)
.then(result => {
  app.listen(3000);
})
.catch(err =>{
  console.log(err);
});
