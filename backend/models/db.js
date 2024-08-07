const mongoose = require('mongoose');
var credentials = require('../credentials.js');

// Choose which URL to use for this connection
let dbURI = credentials.mongo.development.connectionString;
if (process.env.NODE_ENV === 'production') {
  dbURI = credentials.mongo.production.connectionString;
}

const run = async () => {
  await mongoose.connect(dbURI);
}

run();

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

