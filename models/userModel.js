const mongoose = require('mongoose');
const { connectToMongoDB, disconnectFromMongoDB } = require('../connection/db');

//This is my function to connect to MongoDB AND is called here.
connectToMongoDB();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
 
});

const User = mongoose.model('User', userSchema);

//User is exported to be accessible
module.exports = User;

//would also export 'disconnectFromMongoDB' from here as well
module.exports.disconnectFromMongoDB = disconnectFromMongoDB;
