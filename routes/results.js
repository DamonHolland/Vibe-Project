var express = require('express');
var router = express.Router();

/* GET results page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    console.log(req.session.qid);
    res.render('results');
  }
});

/* Handle Vote */
router.post('/', function(req, res, next) {
  //Do the vote handling stuff here
  res.redirect('../');
});

module.exports = router;