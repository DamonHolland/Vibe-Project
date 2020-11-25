var express = require('express');
var router = express.Router();
var User = require('../models/user');
const encryptor = require('bcrypt');

const register = require('../public/javascripts/validateRegistration');

/* GET recover page. */
router.get('/', function(req, res, next) {
  if (req.session.user){
    res.redirect('/');
  }
  else{
    res.render('recover', {title: "Recover"});
  }
});

/* GET reset password page. */
router.get('/reset', function(req, res, next) {
  if (req.session.user){
    res.redirect('/');
  }
  else{
    req.session.disableZero = true;
    req.session.disableOne = true;
    req.session.disableTwo = true;
    req.session.disableThree = true;
    if (req.session.recoverquestion == 0) {
      req.session.disableZero = false;
    }
    else if (req.session.recoverquestion == 1) {
      req.session.disableOne = false;
    }
    else if (req.session.recoverquestion == 2) {
      req.session.disableTwo = false;
    }
    else if (req.session.recoverquestion == 3) {
      req.session.disableThree = false;
    }
    res.render('reset', {
      title: "Reset Password",
      zeroDisabled: req.session.disableZero,
      oneDisabled: req.session.disableOne,
      twoDisabled: req.session.disableTwo,
      threeDisabled: req.session.disableThree
    });
  }
});

/* Request recovery */
router.post('/', function(req, res, next) {
  const ERROR_USER_NOT_EXIST = "Username does not exist.";
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (!user){
      res.render('recover', {title: 'Recover',  errorbox: ERROR_USER_NOT_EXIST });
    }
    else{
      req.session.recoverquestion = user.securityQuestion;
      req.session.username = user.username;
      res.redirect('/recover/reset');
    }
  });
});


/* Validate recovery */
router.post('/reset', function(req, res, next) {
  const ERROR_SECURITY = "Incorrect security answer.";
  const NO_ERRORS = "";
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else{
      encryptor.compare(req.body.securityanswer, user.securityAnswer, function(err, result){
        if (err) {
          console.log(err);
        }
        else if (result){
          let errorMessage = register.validatePassword(req.body.password, req.body.passwordconfirm);
          if (NO_ERRORS == errorMessage) {
            //Change Pass
          }
          else {
            res.render('reset', {
              title: "Reset Password",
              zeroDisabled: req.session.disableZero,
              oneDisabled: req.session.disableOne,
              twoDisabled: req.session.disableTwo,
              threeDisabled: req.session.disableThree,
              errorbox: errorMessage
            });
          }
        }
        else {
          res.render('reset', {
            title: "Reset Password",
            zeroDisabled: req.session.disableZero,
            oneDisabled: req.session.disableOne,
            twoDisabled: req.session.disableTwo,
            threeDisabled: req.session.disableThree,
            errorbox: ERROR_SECURITY
          });
        }
      });
    }
  });
});
module.exports = router;