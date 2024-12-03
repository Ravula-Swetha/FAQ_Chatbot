const mongoose = require('mongoose');
const { now } = require('mongoose');

const feedbackSchema = mongoose.Schema({
    feedback: {type: String, required: true}, 
    date: {type: Date, default: Date.now}
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;