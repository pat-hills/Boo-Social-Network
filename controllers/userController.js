//Created a saparate called userController to handle request,logics etc of lets say users and their profile
//This helps to keep code clean and more modular
//and also make the app.js fewer clean lines of code

const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

// function/method to create a profile

async function createProfile(req, res) {
    try {
      // Doing the data extraction from request body per user input
      const { name, description,mbti,enneagram,variant,tritype,socionics,sloan,psyche,temperaments } = req.body;
      console.log('Request Body:', req.body);
      if (!name) {
        return res.status(400).json({ error: 'Name is required for creating a profile.' });
      }
  
      // Create a new record using the Profile model
      const newProfile = new Profile({
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        temperaments,
      });
  
      // We save data
      await newProfile.save();
  
      // Respond with the created Profile
      res.status(201).json(newProfile);
    } catch (error) {
      // Handle errors should incase
      console.error('Error creating Profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// function/method to get a profile by its id

  async function getProfileById(req, res) {
    const profileId = req.params.id;
  
    try {
      const profile = await Profile.findById(profileId);
      console.log('Retrieved Profile:', profile);
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.render('profile_template', { profile });
   
    } catch (error) {
      console.error('Error fetching profile by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // function/method to get profiles, was for checking purposes

  async function getAllProfiles(req, res) {
    try {
      console.log('Inside userController: getAllProfiles');
      const profiles = await Profile.find();
  
      // Respond with a JSON body containing the profiles data
      console.log('Sending JSON response with profiles data:', profiles);
      res.status(200).json({ profiles });
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// function/method to create user

  async function createUser(req, res) {
    try {
      // Doing the data extraction from request body per user input
      const { name } = req.body;
      console.log('Request Body:', req.body);
      if (!name) {
        return res.status(400).json({ error: 'Name of user is required for creating an account.' });
      }
  
      // Create a new record using the User model
      const newUser = new User({
        name,
      });
  
      // We save User
      await newUser.save();
  
      // Respond with the created Profile
      res.status(201).json(newUser);
    } catch (error) {
      // Handle errors should incase
      console.error('Error creating User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


// function/method to create user's comment

  async function createComment(req, res) {
    try {
      // Doing the data extraction from request body per user input
      const { comments,authorId } = req.body;
      console.log('Request Body:', req.body);
      if (!comments) {
        return res.status(400).json({ error: 'Comment field is required for creating a comment.' });
      }

      if (!authorId) {
        return res.status(400).json({ error: 'No user is associated with this comment.' });
      }

        // Check if author exists
      const user = await User.findById(authorId);

      if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
      }
  
      // Create a new record using the Comment model
      const newComment = new Comment({
        comments,
        author : authorId
      });
  
      // We create user's comment
      await newComment.save();
  
      // Respond with the created Profile
      res.status(201).json(newComment);
    } catch (error) {
      // Handle errors should incase
      console.error('Error creating User comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Have decided to handle both like and dislike silmultanneously
  // Instead writing a function for like and dislikes which is code redundant for my liking
  // By using an action in the body request

  async function userCommentReaction(req, res) {
    const commentId = req.params.commentId;
    const action = req.body.action; // Determine wether user like or dislike from request body
  
    try {
      // Validating the action here
      if (!['likes', 'dislikes'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action' });
      }
  
      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { $inc: { [action]: 1 } }, 
        { new: true }
      );
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.status(201).json(comment);
  
    } catch (error) {
      console.error('Error handling comment reaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  
  module.exports = { createProfile,getProfileById,getAllProfiles,createUser,createComment,userCommentReaction };

