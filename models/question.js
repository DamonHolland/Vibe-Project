var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    voteCount: {type: Number, required: true, default: 0},
    creationDate: {type: Date, required: true, default: Date.now},
    theQuestion: {type: String, required: true},
    option1: {type: String, required: true},
    option2: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true}
  }
);

//Export model
module.exports = mongoose.model('Question', QuestionSchema);