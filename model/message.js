const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    // required: true
  },
},{ timestamps : true })

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
