var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
  email:      {type: String, required: true},
  password:       {type: String, required: true}
});

// Encrypt the password
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// check if the password mach the hash password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



// Export that blueprint as a module, so I can use it.
module.exports = mongoose.model('User', userSchema);
