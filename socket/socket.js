const { Server } = require('socket.io');
let io;

exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })
  return io;
}

exports.getIo = () =>{
  if(!io) return 'No io';
  return io;
}

// const sockets = (socket) => {
//   socket.on('send-message', (data) => {
//     socket.broadcast.emit('message-from-server', data)
//   })

//   socket.on('typing', () => {
//     socket.broadcast.emit('typing-from-server');
//   })

//   socket.on('typing-stopped', () => {
//     socket.broadcast.emit('typing-stopped-from-server');
//   })

//   socket.on('disconnect', (socket) => {
//     console.log("User left");
//   })
// }


// module.exports = sockets;
