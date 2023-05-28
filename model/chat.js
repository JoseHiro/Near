const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({

  // members: {
  //   type: Array
  // }
  members:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
