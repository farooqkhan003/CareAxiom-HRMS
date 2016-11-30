var flash = require('connect-flash');
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
var profile = require('./routes/profile');
var calendar = require('./routes/calendar');
var employee = require('./routes/employee');
var company = require('./routes/company');
var authentication = require('./app/middlewares/authentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'SpeaktaVeryGoodEngrish',
    saveUninitialized: true,
    resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/profile', authentication.isAuthenticated, profile);
app.use('/calendar', authentication.isAuthenticated, calendar);
app.use('/employee', authentication.isAuthenticated, employee);
app.use('/company', company);
app.post('/login', function (req, res, next) {
    passport.authenticate('local.signIn', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('message', info.message);
            return res.redirect('/');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            var redirectURL = '/profile/view?user=' + user.get('username');
            return res.redirect(redirectURL);
        });
    })(req, res, next);
});
app.get('/logout', authentication.destroySession);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
