require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function connectToMongoDB() {
  if (process.env.NODE_ENV === 'test') {
    // If in testing environment and no server instance, create a new one
    if (!mongoServer) {
      mongoServer = new MongoMemoryServer();
      await mongoServer.start(); // Start the server
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  } else {
    // In other environments, use the regular MongoDB connection if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI is not defined for non-testing environments.');
      process.exit(1); // Exit the application if MONGODB_URI is not defined
    }

    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}

async function disconnectFromMongoDB() {
  await mongoose.disconnect();
  if (mongoServer && process.env.NODE_ENV === 'test') {
    await mongoServer.stop();
    mongoServer = null; // Reset the server instance after stopping
  }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };
