var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:      {type: String, required: true},
  password:       {type: String, required: true}
});

// Export that blueprint as a module, so I can use it.
module.exports = mongoose.model('User', userSchema);
