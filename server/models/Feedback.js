const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],
  created: { type: Date, default: Date.now, required: true },
}, { collection: 'feedback' });

const Feedback = mongoose.model(FeedbackSchema.options.collection, FeedbackSchema);

exports.Feedback = Feedback;
