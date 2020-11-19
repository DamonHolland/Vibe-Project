var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

const register = require('../public/javascripts/validateRegistration');

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Sign in' });
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
    }
  });

});

/* GET registration page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* Handle Registration */
router.post('/register', function(req, res) {
  const NO_ERRORS = "";
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;
  let email = req.body.email;
  
  let error_message = register.validateRegistration(firstName, lastName, username, password, passwordconfirm, email);

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
        res.render('signIn', { title: 'Sign in' });
      }
    })
  }
  else {
    res.render('register', {title: 'Register',  errorbox: error_message });
  }

  
});

/* GET update account page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Account' });
});

module.exports = router;
