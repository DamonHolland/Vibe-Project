var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var Answer = require('../models/answer');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login');
  }
  else{
    console.log("line 12");
    var answerQuery = Answer.find({user: req.session.user._id});

    answerQuery.exec(function(answerErr, answers) {
      console.log("line 16");
      if (answerErr) {
        console.log(answerErr);
      }
      else {
        console.log("line 21");
        var questionQuery = Question.find({}).sort({voteCount: -1});

        questionQuery.exec(function(questionErr, questions) {
          if(questionErr)
          {
            console.log(questionErr);
          }
          else {
            console.log("line 30");
            var found = false;
            console.log("line 32 found = " + found);
            for (var i = 0; i < questions.length && !found; ++i) {
              console.log("line 34 i = " + i);
              var contained = false;
              console.log("line 36 contained = " + contained);
              for (var j = 0; j < answers.length && !contained; ++j) {
                console.log("line 38 j = " + j);
                console.log("line 39 answers[j].question = " + answers[j].question);
                console.log("line 40    questions[i]._id = " + questions[i]._id);
                console.log("line 41            equality = " + answers[j].question.toString() == questions[i]._id.toString());
                if(answers[j].question.toString() == questions[i]._id.toString()) {
                  contained = true;
                }
              }
              if (!contained) {
                req.session.question = questions[i];
                found = true;
                res.render('main', {
                  theQuestion: questions[i].theQuestion,
                  option1: questions[i].option1,
                 option2: questions[i].option2
                });
              }
            }
            if(!found) {
              res.redirect('/addQuestion');
            }
          }
        });
      }
    });
  }
});

/* Submit Answer */
router.post('/', function(req, res, next) {
  if ("Submit" == req.body.buttons)
  {
    if(!req.body.options)
    {
      res.redirect('/');
    }
    else {
      Answer.create({
        user: req.session.user._id,
        question: req.session.question._id,
        answer: req.body.options
      });
    }
  }
  res.redirect('results');
});

module.exports = router;