const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost/Mini';

const connect = () => {
  setTimeout(() => mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true }), 1000);
}

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURL}`);
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

//
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

connect();

require('./restaurants');