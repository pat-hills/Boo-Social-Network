'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for creating a new profile
router.post('/create-profile', userController.createProfile);

// Route for getting a profile by ID
router.get('/profiles/:id', userController.getProfileById);


// Route for getting all profiles
router.get('/all-profiles', userController.getAllProfiles);

module.exports = router;

// Commenting  the initial codes out

// const profiles = [
//   {
//     "id": 1,
//     "name": "A Martinez",
//     "description": "Adolph Larrue Martinez III.",
//     "mbti": "ISFJ",
//     "enneagram": "9w3",
//     "variant": "sp/so",
//     "tritype": 725,
//     "socionics": "SEE",
//     "sloan": "RCOEN",
//     "psyche": "FEVL",
//     "image": "https://soulverse.boo.world/images/1.png",
//   }
// ];

// module.exports = function() {

//   router.get('/*', function(req, res, next) {
//     res.render('profile_template', {
//       profile: profiles[0],
//     });
//   });

//   return router;

// }

  // End of initial codes





