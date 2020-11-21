var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    firstName: {type: String, required: true, maxlength: 25},
    lastName: {type: String, required: true, maxlength: 25},
    username: {type: String, required: true, unique: true, maxlength: 25},
    password: {type: String, required: true, maxlength: 25},
    email: {type: String, required: true, maxlength: 25},
    securityQuestion: {type: String},
    securityAnswer: {type: String}
  }
);

// Virtual for full name
UserSchema
.virtual('fullName')
.get(function () {
  return this.firstName + " ", + this.lastName;
});

//Export model
module.exports = mongoose.model('User', UserSchema);