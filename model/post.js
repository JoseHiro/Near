const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    requried: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required : true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  locationName:{
    type: String,
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
