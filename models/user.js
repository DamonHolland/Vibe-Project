var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    uid: {type: Number, required: true},
    first_name: {type: String, required: true, maxlength: 25},
    last_name: {type: String, required: true, maxlength: 25},
    username: {type: String, required: true, maxlength: 25},
    password: {type: String, required: true, maxlength: 25},
    email: {type: String, required: true, maxlength: 25},
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);