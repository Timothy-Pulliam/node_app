const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
// process.env.ENV_VAR

// Database / Mongodb
const mongodb = require('mongodb');
const mongoose = require('mongoose');
//const mongoose = require('mongoose');

const nunjucks = require('nunjucks');

// Session / Redis
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST
});
const redisStore = require('connect-redis')(session);

// Helpers
const path = require('path');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const cookieParser = require('cookie-parser');

// parse json data from post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Templating
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Database / mongodb
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = encodeURIComponent(process.env.MONGO_USER);
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const authMechanism = 'DEFAULT';
const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/admin`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(function(reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  name: '_redisSessionId',
  resave: false,
  saveUnitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60000 // 30 minutes
  },
  store: new redisStore({
    host: process.env.REDIS_HOST,
    port: 6379,
    client: redisClient,
    ttl: 86400
  })
}))

// Routes
var routes = require('./routes/routes.js');
app.use('/', routes)

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const EXPRESS_HOST = process.env.EXPRESS_HOST;
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => {
  console.log(`Express app listening at ${EXPRESS_HOST}:${EXPRESS_PORT}`);
})

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
})