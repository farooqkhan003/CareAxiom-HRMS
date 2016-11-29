var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  global.db.User.findOne({
    where: {
      id: id,
      is_archived: false
    }
  }).then(function (user) {
    user.rank = user.get('rank');
    done(null, user);
  }).catch(function (err) {
    done(err, null);
  });
});

passport.use('local.signIn', new LocalStrategy({}, function(username, password, done) {
    global.db.User.findOne({
      where: {
        username: username,
        is_archived: false
      }
    }).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.validPassword(password, user.password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    }).catch(function (err) {
      if (err) {
        return done(err);
      }
    });
}));

module.exports = passport;