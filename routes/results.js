var express = require('express');
var router = express.Router();

/* GET results page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('results');
  }
});

module.exports = router;