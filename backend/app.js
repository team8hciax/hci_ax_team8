// Load babel for subsequent imports in ES2015
require('babel-register');
require('babel-polyfill');


var config = require('nconf');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');
var session = require('express-session');

// Configure and connect Mongoose
//set mongoose Promise provider to bluebird
mongoose.Promise = require('bluebird');
// Connect to database
mongoose.connect(config.get('MONGODB_URL'),{useMongoClient:true}).then(
 ()=> { console.log("Connected! url= "+config.get('MONGODB_URL'));}
);

// Retry connection
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(config.get('MONGODB_URL'),{useMongoClient:true})
  }

  // Exit application on error
mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`)
    setTimeout(connectWithRetry, 5000)
    // process.exit(-1)
  })


  /**
 * Configure passport
 */
require('./config/passport').init();
