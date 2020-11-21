var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Sign in' });
});

/* Handle login */
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
      req.session.user = user;
      res.redirect('/');
    }
  });
});

module.exports = router;