var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login');
  }
  else{
    res.render('main');
  }
});

/* Submit Answer */
router.post('/', function(req, res, next) {
    res.redirect('results');
});

module.exports = router;