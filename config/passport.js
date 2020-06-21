var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
  done(null, user.id);
}); // Tell passports how to store the user in the seccion. And serialize it by id

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordFiled: 'password',
  passReqToCallback: true // pass the request to the callback
}, function(req, email, password, done) {
User.findOne({'email': email}, function(err, user) {
  if (err) {
    return done(err);
  }
  if (user) {
    return done(null, false, {message: 'Email is already in use'})
  }

  var newUser = new User();
  newUser.email = email;
  newUser.password = newUser.encryptPassword(password);
  newUser.save(function(err, result) {
      if (err) {
        return done(err)
      }

      return done(null, newUser);
  })
})
}));
