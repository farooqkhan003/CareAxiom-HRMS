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

passport.use('local.signIn', new LocalStrategy({}, function(username, password, done) {
    global.db.User.findOne({
      where: { username : username }
    }).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.validPassword(password, user).then(function (user) {
        // console.log('\n\n\nabababa', user);
        return done(null, user);
      }).catch(function (err) {
        console.log('\n\n\nerror');
        return done(err, false, { message: 'Incorrect password.' });
      });
    }).catch(function (err) {
      if (err) {
        return done(err, false, { message: "Couldn't find user" });
      }
    });
}));

module.exports = passport;