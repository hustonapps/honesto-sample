require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const { Question } = require('./models/Question');
const { connectDb, seedData } = require('./db');

const app = express();

app.use(bodyParser.json({ extended: true }));

const port = process.env.NODE_ENV === 'localdev' ? 4040 : process.env.PORT || 3000;

app.get('/api/teamFeedback', async (req, res) => {
  const loggedInUser = await User.findOne({ name: 'Jane Smith'});
  const feedback = await Question.aggregate([
    {
      $match: {
        from: {
          $eq: loggedInUser.name,
        },
      },
    },
    {
      $group: {
        _id: '$feedbackId',
        entries: {
          $push: '$$ROOT',
        }
      },
    },
  ]);
  res.json(feedback);
});

app.get('/api/feedback/:feedbackId', async (req, res) => {
  const feedback = await Question.find({ feedbackId: req.params.feedbackId });
  return res.json(feedback);
});

app.post('/api/feedback/:feedbackId/skip', async (req, res) => {
  try {
    const { questionId } = req.body;
    await Question.findOneAndUpdate({ feedbackId: req.params.feedbackId, _id: questionId }, { answer: null, skipped: true });
  } catch (e) {
    console.error(e);
  } finally {
    res.end();
  }
});

app.post('/api/feedback/:feedbackId', async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    await Question.findOneAndUpdate({ feedbackId: req.params.feedbackId, _id: questionId }, { answer, skipped: false });
  } catch (e) {
    console.error(e);
  } finally {
    res.end();
  }
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
