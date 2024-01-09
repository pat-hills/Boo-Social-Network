'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =  process.env.PORT || 3001; 
const { connectToMongoDB, disconnectFromMongoDB } = require('./connection/db'); 
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/userRoute');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// We do our mongoDB connection function here
connectToMongoDB();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/api', profileRoutes);
app.use('/api', userRoutes);

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = app;
