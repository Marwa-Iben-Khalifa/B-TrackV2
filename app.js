require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
require("express-async-errors");
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session       = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose
  .connect('mongodb://localhost/b-trackv2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

// Enable authentication using session + passport
app.use(session({
  secret: `${app_name}-shhhhhhht`,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
require('./passport')(app);
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/fileUploader'));

app.use(express.static(path.join(__dirname, 'public')));

// ADD SESSION SETTINGS HERE:
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: '*'
}));


const index = require('./routes/index');
app.use('/', index);


// Middleware error
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  res.json({message: err.message})
});

module.exports = app;
