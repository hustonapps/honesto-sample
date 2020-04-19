require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { User } = require('./models/User');
const { Feedback } = require('./models/Feedback');
const { connectDb, seedData } = require('./db');

app.get('/api/teamFeedback', async (req, res) => {
  const loggedInUser = await User.findOne({ name: 'Jane Smith'});
  const teamFeedback = await Feedback.find({ to: { $ne: loggedInUser._id } }).populate('questions to from');
  return res.json(teamFeedback);
});

app.get('/api/feedback/:feedbackId', async (req, res) => {
  const feedback = await Feedback.findById(req.params.feedbackId).populate('questions to from');
  return res.json(feedback);
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

connectDb().then(async () => {
  console.log('db connected');
  seedData();
  app.listen(port, () => console.log(`Honesto sample listening on port${port}`));
}).catch((err) => {
  console.error(err, 'db connection failed');
});
