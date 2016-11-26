var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  global.db.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signIn', new LocalStrategy({}, function(req, username, password, done) {
  console.log('\n\n\n\n\nI come here');
  global.db.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // pswdHash = user ? user.password : '';
      // isMatch = db.User.validPassword(password, pswdHash, done, user);
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;