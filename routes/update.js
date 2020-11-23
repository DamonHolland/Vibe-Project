var express = require('express');
var router = express.Router();

/* GET update account page. */
router.get('/', function(req, res, next) {
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
    console.log();
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
      firstFieldLabel: FIELD_LABEL_SAVE
    });
  }
});

/* GET update last name page. */
router.get('/lastName', function(req, res, next) {
  const FIELD_LABEL_EDIT = "Edit";
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
    });
  }
});

/* GET update email page. */
router.get('/email', function(req, res, next) {
  const FIELD_LABEL_EDIT = "Edit";
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
    });
  }
});

/* GET update username page. */
router.get('/username', function(req, res, next) {
  const FIELD_LABEL_EDIT = "Edit";
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
    });
  }
});

/* Handle Updating of account info */
router.post('/', function(req, res, next) {
  res.redirect('../');
});

module.exports = router;