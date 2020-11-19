var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    voteCount: {type: Int, required: true, default: 0},
    creationDate: {type: Date, required: true, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true}
  }
);

// Virtual for voteCount
QuestionSchema
.virtual('voteCount')
.get(function () {
  return this.voteCount;
});

// Virtual for creationDate
QuestionSchema
.virtual('creationDate')
.get(function () {
  return this.creationDate;
});

// Virtual for author
QuestionSchema
.virtual('author')
.get(function () {
  return this.author;
});

//Export model
module.exports = mongoose.model('Question', QuestionSchema);