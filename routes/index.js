var express = require('express');
var router = express.Router();
var Product = require('../models/product')
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
  res.render('user/signup', {csrfToken: req.csrfToken()}) // When someone make a tretrive it create a token
})

router.post('/user/signup', function(req, res, next) {
  res.redirect('/') // When someone make a tretrive it create a token
})

module.exports = router;
