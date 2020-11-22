var express = require('express');
var router = express.Router();

/* GET add Question page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('addQuestion');
  }
});

module.exports = router;