const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  to: { type: String },
  from: { type: String },
  feedbackId: { type: mongoose.Schema.Types.ObjectId },
  question: { type: String },
  options: {
    belowAvg: { type: String },
    avg: { type: String },
    aboveAvg: { type: String },
  },
  scaleRatingText: { type: String },
  questionType: {
    type: String,
    enum: ['question', 'options', 'scaleRating'],
    default: 'question',
  },
  answer: { type: String },
  skipped: { type: Boolean, default: false },
}, { collection: 'question' });

const Question = mongoose.model(QuestionSchema.options.collection, QuestionSchema);

exports.Question = Question;
