var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    question: {type: Schema.Types.ObjectId, ref: 'Question', required: true, unique: true},
    answer: {type: Number, required: true},
    date: {type: Date, default: Date.now}
  }
);


//Export model
module.exports = mongoose.model('Answer', AnswerSchema);