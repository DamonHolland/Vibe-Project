var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
  //NEEDS CHANGED. Just set their uid to 10 for now. Not sure how we want to handle this.
  var uid = 10;
  var first_name = req.body.firstname;
  var last_name = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  var newUser = new User();
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
      return res.status(200).send();
    }
  })

});

/* GET update account page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Account' });
});

module.exports = router;
