var express = require('express');
const session = require('express-session');
var router = express.Router();
var User = require('../models/user');
const register = require('../public/javascripts/validateRegistration');

/* GET update account page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('update', {
      title: 'Update Account',
      first: req.session.user.firstName,
      last: req.session.user.lastName,
      email: req.session.user.email,
      user: req.session.user.username,
      firstFieldDisabled: true,
      lastFieldDisabled: true,
      emailFieldDisabled: true,
      userFieldDisabled: true
    });
  }
});

/* GET update first name page. */
router.get('/firstName', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";


  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('update', {
      title: 'Update Account',
      first: req.session.user.firstName,
      last: req.session.user.lastName,
      email: req.session.user.email,
      user: req.session.user.username,
      firstFieldDisabled: false,
      lastFieldDisabled: true,
      emailFieldDisabled: true,
      userFieldDisabled: true,
      firstFieldLabel: FIELD_LABEL_SAVE,
      submitFirst: "document.getElementById('updateForm').submit()"
    });
  }
});

/* GET update last name page. */
router.get('/lastName', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";


  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    console.log();
    res.render('update', {
      title: 'Update Account',
      first: req.session.user.firstName,
      last: req.session.user.lastName,
      email: req.session.user.email,
      user: req.session.user.username,
      firstFieldDisabled: true,
      lastFieldDisabled: false,
      emailFieldDisabled: true,
      userFieldDisabled: true,
      lastFieldLabel: FIELD_LABEL_SAVE,
      submitLast: "document.getElementById('updateForm').submit()"
    });
  }
});

/* GET update email page. */
router.get('/email', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";


  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    console.log();
    res.render('update', {
      title: 'Update Account',
      first: req.session.user.firstName,
      last: req.session.user.lastName,
      email: req.session.user.email,
      user: req.session.user.username,
      firstFieldDisabled: true,
      lastFieldDisabled: true,
      emailFieldDisabled: false,
      userFieldDisabled: true,
      emailFieldLabel: FIELD_LABEL_SAVE,
      submitEmail: "document.getElementById('updateForm').submit()"
    });
  }
});

/* GET update username page. */
router.get('/username', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";


  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    console.log();
    res.render('update', {
      title: 'Update Account',
      first: req.session.user.firstName,
      last: req.session.user.lastName,
      email: req.session.user.email,
      user: req.session.user.username,
      firstFieldDisabled: true,
      lastFieldDisabled: true,
      emailFieldDisabled: true,
      userFieldDisabled: false,
      userFieldLabel: FIELD_LABEL_SAVE,
      submitUser: "document.getElementById('updateForm').submit()"
    });
  }
});

/* Handle Updating of first name */
router.post('/firstName', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";
  let firstName = req.body.firstname;
  let errorMessage = register.validateFirstName(firstName);
  
  User.findOne({username: req.session.user.username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {
      if (errorMessage) {
        res.render('update', {
          title: 'Update Account',
          first: req.session.user.firstName,
          last: req.session.user.lastName,
          email: req.session.user.email,
          user: req.session.user.username,
          firstFieldDisabled: false,
          lastFieldDisabled: true,
          emailFieldDisabled: true,
          userFieldDisabled: true,
          firstFieldLabel: FIELD_LABEL_SAVE,
          submitFirst: "document.getElementById('updateForm').submit()",
          errorbox: errorMessage
        });
      }
      else {
        user.firstName = firstName;
        user.save (function (err){
          if (err) {
            console.log(err);
          }
          else {
            req.session.user = user;
            res.redirect('/update');
          }
        });
      }
    }
  });
});

/* Handle Updating of last name */
router.post('/lastName', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";
  let lastName = req.body.lastname;
  let errorMessage = register.validateLastName(lastName);
  
  User.findOne({username: req.session.user.username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {
      if (errorMessage) {
        res.render('update', {
          title: 'Update Account',
          first: req.session.user.firstName,
          last: req.session.user.lastName,
          email: req.session.user.email,
          user: req.session.user.username,
          firstFieldDisabled: true,
          lastFieldDisabled: false,
          emailFieldDisabled: true,
          userFieldDisabled: true,
          lastFieldLabel: FIELD_LABEL_SAVE,
          submitLast: "document.getElementById('updateForm').submit()",
          errorbox: errorMessage
        });
      }
      else {
        user.lastName = lastName;
        user.save (function (err){
          if (err) {
            console.log(err);
          }
          else {
            req.session.user = user;
            res.redirect('/update');
          }
        });
      }
    }
  });
});

/* Handle Updating of email*/
router.post('/email', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";
  let email = req.body.email;
  let errorMessage = register.validateEmail(email);
  
  User.findOne({username: req.session.user.username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {
      if (errorMessage) {
        res.render('update', {
          title: 'Update Account',
          first: req.session.user.firstName,
          last: req.session.user.lastName,
          email: req.session.user.email,
          user: req.session.user.username,
          firstFieldDisabled: true,
          lastFieldDisabled: true,
          emailFieldDisabled: false,
          userFieldDisabled: true,
          emailFieldLabel: FIELD_LABEL_SAVE,
          submitEmail: "document.getElementById('updateForm').submit()",
          errorbox: errorMessage
        });
      }
      else {
        user.email = email;
        user.save (function (err){
          if (err) {
            console.log(err);
          }
          else {
            req.session.user = user;
            res.redirect('/update');
          }
        });
      }
    }
  });
});

/* Handle Updating of username*/
router.post('/username', function(req, res, next) {
  const FIELD_LABEL_SAVE = "Save";
  const ERROR_USERNAME_TAKEN = "The username is taken.";
  let username = req.body.username;
  let errorMessage = register.validateUsername(username);

  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    else if (user){
      errorMessage = ERROR_USERNAME_TAKEN;
      res.render('update', {
        title: 'Update Account',
        first: req.session.user.firstName,
        last: req.session.user.lastName,
        email: req.session.user.email,
        user: req.session.user.username,
        firstFieldDisabled: true,
        lastFieldDisabled: true,
        emailFieldDisabled: true,
        userFieldDisabled: false,
        userFieldLabel: FIELD_LABEL_SAVE,
        submitUser: "document.getElementById('updateForm').submit()",
        errorbox: errorMessage
      });
    }
    else {
      User.findOne({username: req.session.user.username}, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (errorMessage) {
            res.render('update', {
              title: 'Update Account',
              first: req.session.user.firstName,
              last: req.session.user.lastName,
              email: req.session.user.email,
              user: req.session.user.username,
              firstFieldDisabled: true,
              lastFieldDisabled: true,
              emailFieldDisabled: true,
              userFieldDisabled: false,
              userFieldLabel: FIELD_LABEL_SAVE,
              submitUser: "document.getElementById('updateForm').submit()",
              errorbox: errorMessage
            });
          }
          else {
            user.username = username;
            user.save (function (err){
              if (err) {
                console.log(err);
              }
              else {
                req.session.user = user;
                res.redirect('/update');
              }
            });
          }
        }
      });
    }
  });
});

module.exports = router;