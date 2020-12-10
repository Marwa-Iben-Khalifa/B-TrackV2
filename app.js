require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
require("express-async-errors");
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session       = require('express-session');
const app_name = require('./package.json').name;
const MongoStore = require('connect-mongo')(session);

mongoose
  .connect('mongodb://localhost/b-trackv2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
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
// app.use('/api', require('./routes/dashboard'));
app.use('/api', require('./routes/bugs'));
app.use('/api', require ('./routes/services'))
app.use('/api', require ('./routes/user-profil'))


// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);




// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));

//
// After routes: static server || React SPA
//

app.use(express.static(path.join(__dirname, 'client/build')));

// route not-found => could be a React route => render the SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      next(err)
    }
  })
});


app.use((err, req, res, next) => {
  function er2JSON(er) {
    // http://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify#18391212
    var o = {};
  
    Object.getOwnPropertyNames(er).forEach(function (key) {
      o[key] = er[key];
    });
  
    return o;
  }

  // always log the error
  console.error('ERROR', req.method, req.path, err);

  err = er2JSON(err);
  err.status || (err.status = 500); // default to 500
  res.status(err.status);

  res.json(err);
});







// Middleware error
// app.use((err, req, res, next) => {
//   // always log the error
//   console.error('ERROR', req.method, req.path, err);

//   res.json({message: err.message})
// });

module.exports = app;
