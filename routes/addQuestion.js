var express = require('express');
var router = express.Router();

/* GET add Question page. */
router.get('/', function(req, res, next) {
  res.render('addQuestion');
});

module.exports = router;