var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var updateRouter = require('./routes/update');
var addQuestionRouter = require('./routes/addQuestion');
var resultsRouter = require('./routes/results');
var logoutRouter = require('./routes/logout');
var recoverRouter = require('./routes/recover');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');

//******************************************************************************
//INSTRUCTIONS FOR RUNNING LOCAL DATABASE

//If Running on the cloud, keep this line below, else comment it out
var mongoDB = 'mongodb+srv://VibeAdmin:vBh24T76GHlTomHG@cluster0.qrok4.mongodb.net/vibe';

//If Running locally, uncomment this portion below
//var mongoDB = 'mongodb://127.0.0.1:27017/LocalDatabase';

//******************************************************************************



mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "ThisShouldBeSecret", resave: false, saveUninitialized: true}));
app.use(express.static('public'))

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/update', updateRouter);
app.use('/addQuestion', addQuestionRouter);
app.use('/results', resultsRouter);
app.use('/logout', logoutRouter);
app.use('/recover', recoverRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
