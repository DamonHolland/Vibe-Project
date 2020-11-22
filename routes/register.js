var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
const encryptor = require('bcrypt');

const register = require('../public/javascripts/validateRegistration');

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* Handle Registration */
router.post('/', function(req, res) {
  const NO_ERRORS = "";
  const ERROR_USERNAME_TAKEN = "The username is taken.";
  const ERROR_FIELD_CLASS = "errorInput";
  const HASHING_ROUNDS = 5;

  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;
  let email = req.body.email;
  let securityQuestion = req.body.question;
  let securityAnswer = req.body.securityanswer;
  let error_message = "";

  let firstInputField = "";
  let lastInputField = "";
  let userInputField = "";
  let passInputField = "";
  let emailInputField = "";
  let answerInputField = "";

  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (user){
      error_message = error_message.concat(ERROR_USERNAME_TAKEN + "\n");
      username = "";
    }
    else {
      if (register.validateUsername(username)) {
        error_message = error_message.concat(register.validateUsername(username) + "\n");
        username = "";
        userInputField = ERROR_FIELD_CLASS;
      }
    }
    
    if (register.validateFirstName(firstName)) {
      error_message = error_message.concat(register.validateFirstName(firstName) + "\n");
      firstName = "";
      firstInputField = ERROR_FIELD_CLASS;
    }
    if (register.validateLastName(lastName)) {
      error_message = error_message.concat(register.validateLastName(lastName) + "\n");
      lastName = "";
      lastInputField = ERROR_FIELD_CLASS;
    }
    if (register.validatePassword(password, passwordconfirm)) {
      error_message = error_message.concat(register.validatePassword(password, passwordconfirm) + "\n");
      passInputField = ERROR_FIELD_CLASS;
    }
    if (register.validateEmail(email)) {
      error_message = error_message.concat(register.validateEmail(email) + "\n");
      email = "";
      emailInputField = ERROR_FIELD_CLASS;
    }
    if (register.validateSecurityAnswer(securityAnswer)) {
      error_message = error_message.concat(register.validateSecurityAnswer(securityAnswer) + "\n");
      securityAnswer = "";
      answerInputField = ERROR_FIELD_CLASS;
    }

    
    if (NO_ERRORS == error_message) {
      let newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.username = username;
      newUser.email = email;
      newUser.securityQuestion = securityQuestion;
      newUser.securityAnswer = securityAnswer;

      encryptor.hash(password, HASHING_ROUNDS, function (err, hashPass){
        if (err) {
          console.log(err);
        }
        else {
          encryptor.hash(securityAnswer, HASHING_ROUNDS, function (err, hashAnswer){
            if (err) {
              console.log(err);
            }
            else {
              newUser.password = hashPass;
              newUser.securityAnswer = hashAnswer;
              newUser.save(function(error, savedUser) {
              if(error) {
                console.log(error);
              }
              else {
                res.redirect('/login');
              }
          });

            }
          });
        }
      });
    }
    else {
      res.render('register', {
        title: 'Register',
        first: firstName,
        last: lastName,
        email: email,
        user: username,
        firstField: firstInputField,
        lastField: lastInputField,
        userField: userInputField,
        emailField: emailInputField,
        passField: passInputField,
        answerField: answerInputField,
        errorbox: error_message
      });
    }
  });
});

module.exports = router;