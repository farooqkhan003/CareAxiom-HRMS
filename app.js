var express = require('express');
var passport = require('./config/passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// app.locals.rootDirectory = __dirname;

var index = require('./routes/index');
var users = require('./routes/users');
var authentication = require('./app/middlewares/authentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'SpeaktaVeryGoodEngrish',
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', index);
app.post('/login', passport.authenticate('local.signIn', {
  successRedirect: '/home',
  failureRedirect: '/'
}));
// app.use('/home', authentication.isAuthenticated, home.homepage);
app.use('/users', users);
app.get('/logout', authentication.destroySession);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
