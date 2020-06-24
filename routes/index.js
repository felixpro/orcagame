var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');

// protection for password
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection); // midleware for router

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
// retreving info from the database
      var productChunks =[]; /* Reducir el array de objetos a solo un array */
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
      }

    res.render('shop/index', { title: 'Shopping App', products: productChunks });
  });
});


router.get('/user/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0
  }) // When someone make a tretrive it create a token
})

// Set the strategy to use when createing a
// new user. The local.signup method allow me to verify if
// the password is already in  the db or if theres any error
router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true // flash the message
}))


router.get('/user/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0
  }) // When someone make a tretrive it create a token
})
router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true // flash the message
}))




router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
});

module.exports = router;
