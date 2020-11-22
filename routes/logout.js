var express = require('express');
var router = express.Router();

/* Handle log out */
router.get('/', function(req, res, next) {
  req.session.user = null;
    res.redirect('../login');
});

module.exports = router;