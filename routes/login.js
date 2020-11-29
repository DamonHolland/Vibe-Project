var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
const encryptor = require('bcrypt');

/* GET login page. */
router.get('/', function(req, res, next) {
  if (req.session.user){
    res.redirect('/');
  }
  else{
    res.render('signIn', { title: 'Sign in' });
  }
});

/* Handle login */
router.post('/', function(req, res) {
  const ERROR_LOGIN = "Invalid username or password";
  const SESSION_COOKIE_AGE = 1000 * 60 * 60 * 24 * 365;
  let username = req.body.username;
  let password = req.body.password;
  let remember = req.body.rememberme == 'on';

  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (!user){
      res.render('signIn', {title: 'Sign In',  errorbox: ERROR_LOGIN });
    }
    else{
      encryptor.compare(password, user.toObject().password, function(err, result){
        if (err) {
          console.log(err);
        }
        else if (result){
          req.session.user = user;
          if (remember) {
            req.session.cookie.maxAge = SESSION_COOKIE_AGE;
          }
          res.redirect('/');
        }
        else {
          res.render('signIn', {title: 'Sign In',  errorbox: ERROR_LOGIN });
        }
      });
    }
  });
});

module.exports = router;