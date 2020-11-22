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
      user: req.session.user.username
    });
  }
});

/* Handle Updating of account info */
router.post('/', function(req, res, next) {
  res.redirect('../');
});

module.exports = router;