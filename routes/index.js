var express = require('express');
var router = express.Router();
var User = require('../models/user');

const validator = require('../public/javascripts/validateRegistration');

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Sign in' });
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
  
  let error_message = validator.validateRegistration(firstName, lastName, username, password, passwordconfirm, email);

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
        return res.status(500).send();
      }
      else {
        res.render('signIn', { title: 'Sign in' });
        return res.status(200).send();
      }
    })
  }
  else {
    res.render('register', {title: 'Register',  errorbox: error_message });
    console.log(error_message);
    return res.status(200).send();
  }

  
});

/* GET update account page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Account' });
});

module.exports = router;
