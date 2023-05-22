const chatController = require('../controller/chat');
const isAuth = require('../middleware/is-auth');

const sockets = (socket) => {
    socket.on('send-message', (data) => {
      socket.broadcast.emit('message-from-server', data);
      // socket.broadcast.emit('message-from-server', data)
    })
    // socket.on('send-message', (data) => {
    //   console.log('recieved message');
    //   socket.broadcast.emit('message-from-server', data)
    // })


    socket.on('typing', () => {
      socket.broadcast.emit('typing-from-server');
    })

    socket.on('typing-stopped', () => {
      socket.broadcast.emit('typing-stopped-from-server');
    })

    socket.on('disconnect', (socket) => {
      console.log("User left");
    })
}


module.exports = sockets;
