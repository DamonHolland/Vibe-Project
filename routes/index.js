var express = require('express');
var router = express.Router();
var User = require('../models/user');
const validateRegistration = require('../public/javascripts/validateRegistration');

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
router.post('/', function(req, res) {
  const NO_ERRORS = "";
  //NEEDS CHANGED. Just set their uid to 10 for now. Not sure how we want to handle this.
  let uid = 10;
  let first_name = req.body.firstname;
  let last_name = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;
  let email = req.body.email;
  
  let error_message = validator.validateRegistration(first_name, last_name, username, password, passwordconfirm, email);

  if (NO_ERRORS == error_message) {
    let newUser = new User();
    newUser.uid = uid;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
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
