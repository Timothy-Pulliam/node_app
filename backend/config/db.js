const mongoose = require('mongoose');
const dotenv = require('dotenv');
// process.env.ENV_VAR
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = encodeURIComponent(process.env.MONGO_USER);
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const authMechanism = 'DEFAULT';
const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/app?authSource=admin`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB;

// Database / mongodb


// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).catch(function(reason) {
//   console.log('Unable to connect to the mongodb instance. Error: ', reason);
// }).then(() => {
//     console.log('connected to mongo successfully');
// });

//Bind connection to error event (to get notification of connection errors)
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));