var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    uName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
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