var express = require('express');
var router = express.Router();

/* GET update account page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('update', { title: 'Update Account' });
  }
});

module.exports = router;