var express = require('express');
var router = express.Router();
var Question = require('../models/question');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login');
  }
  else{
    var query = Question.find({$query: {}, $orderby: {voteCount: -1}});

    query.exec(function(err, questions) {
      if(err)
      {
        console.log(err);
      }
      else {
        req.session.qid = questions[0]._id;
        res.render('main', {
          theQuestion: questions[0].theQuestion,
          option1: questions[0].option1,
          option2: questions[0].option2
        });
      }
    });
  }
});

/* Submit Answer */
router.post('/', function(req, res, next) {
    res.redirect('results');
});

module.exports = router;