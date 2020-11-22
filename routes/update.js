var express = require('express');
var router = express.Router();

/* GET update account page. */
router.get('/', function(req, res, next) {
  res.render('update', { title: 'Update Account' });
});

module.exports = router;