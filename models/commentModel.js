const mongoose = require('mongoose');
const { connectToMongoDB, disconnectFromMongoDB } = require('../connection/db');

//This is my function to connect to MongoDB AND is called here.
connectToMongoDB();

//I created each column for like and dislike in an incremental manner because
// I would like to know the total number of both metrics at a glance
//Also i might like to just know total dislikes even though might not be show to the users
//Only like would be shown

const commentSchema = new mongoose.Schema({
  comments: { type: String, required: true }, 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  likes: Number,
  dislikes: Number,
  timestamp: { type: Date, default: Date.now },
 
});

const Comment = mongoose.model('Comment', commentSchema);

//Comment is exported to be accessible
module.exports = Comment;

//would also export 'disconnectFromMongoDB' from here as well
module.exports.disconnectFromMongoDB = disconnectFromMongoDB;
