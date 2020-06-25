var express = require('express');
var router = express.Router();
var passport = require('passport');

// protection for password
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection); // midleware for router

router.get('/profile', isLoggedIn,function(req, res, next) {
  res.render('user/profile');
});

router.get('/logout',function(req, res, next) {
  req.logout();
  res.redirect('/');
});


router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0}) // When someone make a tretrive it create a token
})

// Set the strategy to use when createing a
// new user. The local.signup method allow me to verify if
// the password is already in  the db or if theres any error
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true // flash the message
}))


router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0
  }) // When someone make a tretrive it create a token
})
router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true // flash the message
}))






module.exports = router;

// midleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  };
  res.redirect('/');
}


function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  };
  res.redirect('/');
}
