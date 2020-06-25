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
      var toro = false;
// retreving info from the database
      var productChunks =[]; /* Reducir el array de objetos a solo un array */
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
      }

    res.render('shop/index', { title: 'Shopping App', products: productChunks,toro: false });
  });
});




module.exports = router;
