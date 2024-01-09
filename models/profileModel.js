const mongoose = require('mongoose');
const { connectToMongoDB, disconnectFromMongoDB } = require('../connection/db');

//This is my function to connect to MongoDB AND is called here.
connectToMongoDB();

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  mbti: { type: String },
  enneagram: { type: String }, 
  variant: { type: String },
  tritype: { type: Number },
  socionics: { type: String },
  sloan: { type: String },
  psyche: { type: String },
  temperaments: { type: String },  
  profileImageUrl: {
    type: String,
    default: 'https://soulverse.boo.world/images/1.png',
  },
 
 
});

const Profile = mongoose.model('Profile', profileSchema);

//Profile is exported to be accessible
module.exports = Profile;

//would also export 'disconnectFromMongoDB' from here as well
module.exports.disconnectFromMongoDB = disconnectFromMongoDB;
