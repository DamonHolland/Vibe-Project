var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET add Question page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else{
    res.render('addQuestion');
  }
});

/* Submit Question */
router.post('/', function(req, res, next) {
  if(!(req.body.questionBox && req.body.firstOption && req.body.secondOption))
  {
    res.redirect('/addQuestion');
  }
  else {
    Question.create({
      theQuestion: req.body.questionBox,
      option1: req.body.firstOption,
      option2: req.body.secondOption,
      author: req.session.user._id
    });
  }

  res.redirect('/');

});

module.exports = router;