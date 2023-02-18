const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const redis = require('redis');
// const parseurl = require('parseurl');
// const cookieParser = require('cookie-parser');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

// process.env.ENV_VAR
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Templating
const nunjucks = require('nunjucks');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Session / Redis
// const session = require('express-session');
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}`
});
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on("connect", () => {
    console.log("connected to redis successfully");
});

// const redisStore = require('connect-redis')(session);

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     name: '_redisSessionId',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       path: '/',
//       httpOnly: true,
//       secure: false,
//       maxAge: 60000 // 30 minutes
//     },
//     store: new redisStore({
//       host: process.env.REDIS_HOST,
//       port: 6379,
//       client: redisClient,
//       ttl: 86400
//     })
//   }))

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