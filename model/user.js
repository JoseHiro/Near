const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String
  },
  experience: {
    type: String
  },
  Posts: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
