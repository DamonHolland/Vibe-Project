var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    uid: {type: Number, required: true},
    first_name: {type: String, required: true, maxlength: 25},
    last_name: {type: String, required: true, maxlength: 25},
    username: {type: String, required: true, unique: true, maxlength: 25},
    password: {type: String, required: true, maxlength: 25},
    email: {type: String, required: true, maxlength: 25}
  }
);

// Virtual for fName
UserSchema
.virtual('fName')
.get(function () {
  return this.fName;
});

// Virtual for lName
UserSchema
.virtual('lName')
.get(function () {
  return this.lName;
});

// Virtual for name
UserSchema
.virtual('name')
.get(function () {
  return this.fName + " ", + this.lName;
});

// Virtual for uName
UserSchema
.virtual('uName')
.get(function () {
  return this.uName;
});

// Virtual for password
UserSchema
.virtual('password')
.get(function () {
  return this.password;
});

// Virtual for email
UserSchema
.virtual('email')
.get(function () {
  return this.email;
});

//Export model
module.exports = mongoose.model('User', UserSchema);