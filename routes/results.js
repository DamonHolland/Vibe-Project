var express = require('express');
var router = express.Router();
var Answer = require("../models/answer");
var Question = require("../models/question");

/* GET results page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('../login');
  }
  else if (!req.session.question) {
    res.redirect('../');
  }
  else{
    var query = Answer.find({question: req.session.question._id});

    query.exec(function (err, answers) {
      if (err) {
        console.log(err);
      }
      else {
        var option1 = 0;
        var option2 = 0;
        var total = 0;

        answers.forEach(function(item) {
          if(1 == item.answer) {
            option1 += 1;
          }
          else {
            option2 += 1;
          }
          total += 1;
        });
        res.render('results', {
          option1Percent: Math.round(100 * option1 / total),
          option2Percent: Math.round(100 * option2 / total),
          option1Name: req.session.question.option1,
          option2Name: req.session.question.option2
        });
      }
    });
  }
});

/* Handle Vote */
router.post('/', function(req, res, next) {
  //Do the vote handling stuff here
  Question.findOne({_id: req.session.question._id}, function(err, question) {
    if(err) {
      console.log(err);
    }
    else {
      question.voteCount = Number(question.voteCount) + Number(req.body.thumbs);
      question.save(function(error) {
        if(error) {
          console.log(error);
        }
      });
    }
  });
  res.redirect('../');
});

module.exports = router;