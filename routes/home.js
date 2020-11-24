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
    var answerQuery = Answer.find({_id: req.session.user._id});

    answerQuery.exec(function(answerErr, answers) {
      if (answerErr) {
        console.log(answerErr);
      }
      else {
        var questionQuery = Question.find({}).sort({voteCount: -1});

        questionQuery.exec(function(questionErr, questions) {
          if(questionErr)
          {
            console.log(questionErr);
          }
          else {
            var found = false;
            for (var i = 0; i < questions.length && !found; ++i) {
              var contained = false;
              for (var j = 0; j < answers.length && !contained; ++j) {
                console.log(`${answers[j].question} == ${question[i]._id} = ${answers[j].question == question[i]._id}`)
                if(answers[j].question == question[i]._id) {
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