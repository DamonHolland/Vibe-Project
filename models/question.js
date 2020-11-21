var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    voteCount: {type: Int, required: true, default: 0},
    creationDate: {type: Date, required: true, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true}
  }
);

//Export model
module.exports = mongoose.model('Question', QuestionSchema);