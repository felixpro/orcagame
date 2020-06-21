var Product = require('../models/product')
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });


// create multiple products
var products = [

new Product({
  imagePath:   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSltnscGakJFl0sPerFEMn2564dwwsh5lhvDtBP9mHcGOMymqsy&usqp=CAU',
  title:       'Call of duty',
  description: 'Batman: Arkham is a series of action-adventure video games based on the DC Comics character Batman, developed by Rocksteady Studios and WB Games Montréal, and published by Warner Bros. ',
  price: 21
}),

new Product({
  imagePath:   'https://gamesalike.com/wp-content/uploads/2016/09/7-Days-to-Die-1.jpg',
  title:       '7 Days to day',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 785
}),

new Product({
  imagePath:   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDRRB0Wz3cMuW4I2G1Jq4KMCPlfrR0Mf3aanHz4hU6o8PXFkkX&usqp=CAU',
  title:       'Mindnight club',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 423
}),

new Product({
  imagePath:   'https://i.pinimg.com/564x/66/15/77/6615773016c6529932b2809370fde4bb.jpg',
  title:       'Batman',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 154
}),

new Product({
  imagePath:   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSwl2H_kc3JVTZWKnq_PTJXQaX3K_CLJQHcSRwdkvE7WR_z1p4&usqp=CAU',
  title:       'Wild Wild Racing',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 481
}),

new Product({
  imagePath:   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBaPwD9CZli18FOsj0HZk-6oPhYbSEGL-hiw8l9J1OPidCrYo6&usqp=CAU',
  title:       'Hsx',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 358
}),

new Product({
  imagePath:   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcHr6rR-J2pOtjpvUfMNU4gUztFt-a41iWhoBKAAYTreFO-Sfb&usqp=CAU',
  title:       'Undercover',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  price: 751
}),

];

var done = 0;
// save all the pdocuts in the database
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      stopSeed();
    }

  });
}

function stopSeed() {
  mongoose.disconnect();
}
