'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for creating a new User
router.post('/create-user', userController.createUser);

// Route for creating a new User's comment
router.post('/create-comment', userController.createComment);

// Route for liking a comment
router.put('/comments/:commentId/like', userController.userCommentReaction);

// Route for disliking a comment
router.put('/comments/:commentId/dislike', userController.userCommentReaction);

module.exports = router;

 





