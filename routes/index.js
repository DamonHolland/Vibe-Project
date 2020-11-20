var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

const register = require('../public/javascripts/validateRegistration');

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Sign in' });
});

/* GET registration page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET update account page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Account' });
});



/* Handle Sign-in */
router.post('/', function(req, res) {
  const ERROR_LOGIN = "Invalid username or password";
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (!user){
      res.render('signIn', {title: 'Sign In',  errorbox: ERROR_LOGIN });
    }
    else{
      res.render('main');
      //Need to change to res.redirect('/main'), but want to find out what we
      //want to name routes first
    }
  });
});

/* Handle Registration */
router.post('/register', function(req, res) {
  const NO_ERRORS = "";
  const ERROR_USERNAME_TAKEN = "The username is taken.";
  const ERROR_FIELD_CLASS = "errorInput";

  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;
  let email = req.body.email;
  let error_message = "";

  let firstInputField = "";
  let lastInputField = "";
  let userInputField = "";
  let passInputField = "";
  let emailInputField = "";

  
  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (user){
      error_message = error_message.concat(ERROR_USERNAME_TAKEN + "\n");
    }
    
    if (register.validateFirstName(firstName)) {
      error_message = error_message.concat(register.validateFirstName(firstName) + "\n");
      firstName = "";
      firstInputField = "errorInput";
    }
    if (register.validateLastName(lastName)) {
      error_message = error_message.concat(register.validateLastName(lastName) + "\n");
      lastName = "";
      lastInputField = "errorInput";
    }
    if (register.validateUsername(username)) {
      error_message = error_message.concat(register.validateUsername(username) + "\n");
      username = "";
      userInputField = "errorInput";
    }
    if (register.validatePassword(password, passwordconfirm)) {
      error_message = error_message.concat(register.validatePassword(password, passwordconfirm) + "\n");
      passInputField = "errorInput";
    }
    if (register.validateEmail(email)) {
      error_message = error_message.concat(register.validateEmail(email) + "\n");
      email = "";
      emailInputField = "errorInput";
    }

    
    if (NO_ERRORS == error_message) {
      let newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.username = username;
      newUser.password = password;
      newUser.email = email;
      
      newUser.save(function(error, savedUser) {
        if(error) {
          console.log(error);
        }
        else {
          res.redirect('/');
        }
      })
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
        errorbox: error_message
      });
    }
  });
});

module.exports = router;
