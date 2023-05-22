const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const socket = require('./socket/socket');
// const cors = require('cors');
// const { Server } = require('socket.io');
// app.use(cors());
const server = http.createServer(app);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// const User = require('./model/user');

const mongoDb = process.env.MONGO_DB_PASS;

// Routes
const authRoute = require('./routes/auth');
const workRoute = require('./routes/post');
const chatRoute = require('./routes/chat');
const socketRoute = require('./routes/sockets');


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
app.use(authRoute);
app.use(workRoute);
app.use(chatRoute);
app.get('/', (req, res) => {
    res.render('index');
})


app.use(errorController.error);

mongoose
.connect(mongoDb)
.then(result => {
  server.listen(8080);

  // const io = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:3000"
  //   }
  // })

  const io = socket.init(server);

  io.on('connection', (socketRoute));
})
.catch(err =>{
  console.log(err);
});
