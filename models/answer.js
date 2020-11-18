var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    question: {type: Schema.Types.ObjectId, ref: 'Question', required: true, unique: true},
    date: {type: Date}
  }
);

// Virtual for user
AnswerSchema
.virtual('user')
.get(function () {
  return this.user;
});

// Virtual for question
AnswerSchema
.virtual('question')
.get(function () {
  return this.question;
});

// Virtual for date
AnswerSchema
.virtual('date')
.get(function () {
  return this.date;
});

//Export model
module.exports = mongoose.model('Answer', AnswerSchema);