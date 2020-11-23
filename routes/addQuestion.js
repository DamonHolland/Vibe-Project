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

  let questionBox = req.body.questionBox;
  let firstOption = req.body.firstOption;
  let secondOption = req.body.secondOption;

  User.findOne({username: req.session.user.username}, function(err, user) {
    if (err) {
      console.log (err);
    }
    else if (!user) {
      res.redirect('/login');
    }
    else {
      Question.create({theQuestion: questionBox, option1: firstOption, option2: secondOption, author: user._id});
    }
  });
  res.redirect('/');

});

module.exports = router;