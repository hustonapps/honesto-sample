const mongoose = require('mongoose');
const { User } = require('./models/User');
const { Question } = require('./models/Question');

const connectDb = () => {
  if (process.env.NODE_ENV === 'localdev') {
    return mongoose.connect('mongodb://localhost:27017/honesto', { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PW}@cluster0-pe3dr.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
};

const createUsers = async () => {
  const jane = new User({
    name: 'Jane Smith',
  });
  await jane.save();

  const chris = new User({
    name: 'Chris Johnson',
  });

  await chris.save();

  const nico = new User({
    name: 'Nico Perez',
  });

  await nico.save();

  const nathaniel = new User({
    name: 'Nathaniel Moon',
  });

  await nathaniel.save();

  const denis = new User({
    name: 'Denis Denison',
  });

  await denis.save();

  const paul = new User({
    name: 'Paul Carter',
  });

  await paul.save();

  return { jane, chris, nico, nathaniel, denis, paul };
};

const createQuestions = async (users) => {

  const questions = [
    {
      question: 'How well did I display courage?',
      questionType: 'question',
      skipped: true,
    },
    {
      question: 'How well do I display integrity?',
      options: {
        belowAvg: `You may have done one or the following:  Maybe you were mostly quiet in meetings and when you had something on your mind, you brought it to the team afterward. Or, you had feedback that would be valuable to go, but you found it too difficult. Or, you had an opportunity to grow by doing something uncomfortable but you didn’t`,
        avg: 'You sometimes participate in meetings but you feel that they don’t always bring up important things when they should.',
        aboveAvg: 'I and others can count on your courage to help the team do what is right.',
      },
      questionType: 'options',
      skipped: true,
    },
    {
      question: 'How well does X do Y?',
      scaleRatingText: 'Semper fusce purus cras vitae egestas pulvinar inceptos ornare, neque sagittis sodales phasellus suscipit libero nibh convallis, potenti dui magna auctor pellentesque sociis lacus.',
      questionType: 'scaleRating',
      skipped: true,
    },
    {
      question: 'What can I improve?',
      answer: 'Lorem ipsum dolor amet mustache knausgaard +1',
      questionType: 'question',
    },
    {
      question: 'How interesting was my report?',
      options: {
        belowAvg: `Missed the bar completely`,
        avg: 'Did exactly what was asked',
        aboveAvg: 'Blew us away',
      },
      answer: 'avg',
      questionType: 'options',
    },
    {
      question: 'How would you rate my friendliness?',
      scaleRatingText: 'Penatibus montes netus phasellus vitae nulla felis potenti facilisi, conubia tellus eu maecenas imperdiet eros libero, sed sodales luctus nascetur quisque ultrices turpis.',
      answer: '7',
      questionType: 'scaleRating',
    }
  ];

  const questionsAnswered = [
    {
      question: 'How well did I display courage?',
      questionType: 'question',
      answer: 'Penatibus montes netus phasellus vitae nulla felis potenti facilisi, conubia tellus eu maecenas imperdiet eros libero, sed sodales luctus nascetur quisque ultrices turpis.'
    },
    {
      question: 'How well do I display integrity?',
      options: {
        belowAvg: `You may have done one or the following:  Maybe you were mostly quiet in meetings and when you had something on your mind, you brought it to the team afterward. Or, you had feedback that would be valuable to go, but you found it too difficult. Or, you had an opportunity to grow by doing something uncomfortable but you didn’t`,
        avg: 'You sometimes participate in meetings but you feel that they don’t always bring up important things when they should.',
        aboveAvg: 'I and others can count on your courage to help the team do what is right.',
      },
      questionType: 'options',
      answer: 'avg',
    },
    {
      question: 'How well does X do Y?',
      scaleRatingText: 'Semper fusce purus cras vitae egestas pulvinar inceptos ornare, neque sagittis sodales phasellus suscipit libero nibh convallis, potenti dui magna auctor pellentesque sociis lacus.',
      questionType: 'scaleRating',
      answer: '5',
    },
    {
      question: 'What can I improve?',
      answer: 'Lorem ipsum dolor amet mustache knausgaard +1',
      questionType: 'question',
    },
    {
      question: 'How interesting was my report?',
      options: {
        belowAvg: `Missed the bar completely`,
        avg: 'Did exactly what was asked',
        aboveAvg: 'Blew us away',
      },
      answer: 'avg',
      questionType: 'options',
    },
    {
      question: 'How would you rate my friendliness?',
      scaleRatingText: 'Penatibus montes netus phasellus vitae nulla felis potenti facilisi, conubia tellus eu maecenas imperdiet eros libero, sed sodales luctus nascetur quisque ultrices turpis.',
      answer: '7',
      questionType: 'scaleRating',
    }
  ];

  const createFeedback = async (to, from, feedbackId, questionList) => {
    await Promise.all(questionList.map(async (q) => {
      const question = new Question({
        ...q,
        feedbackId,
        to,
        from,
      });

      await question.save();
    }));
  };

  createFeedback('Jane Smith', 'Chris Johnson', new mongoose.Types.ObjectId(), questionsAnswered);
  createFeedback('Jane Smith', 'Nico Perez', new mongoose.Types.ObjectId(), questionsAnswered);
  createFeedback('Jane Smith', 'Denis Denison', new mongoose.Types.ObjectId(), questionsAnswered);

  createFeedback('Denis Denison', 'Jane Smith', new mongoose.Types.ObjectId(), questions);
  createFeedback('Nico Perez', 'Jane Smith', new mongoose.Types.ObjectId(), questionsAnswered);
  createFeedback('Paul Carter', 'Jane Smith', new mongoose.Types.ObjectId(), questions);
  createFeedback('Nathaniel Moon', 'Jane Smith', new mongoose.Types.ObjectId(), questions);
};

const seedData = async () => {
  const users = await User.find({});
  if (!users.length) {
    try {
      const users = await createUsers();
      await createQuestions(users);
    } catch (e) {
      console.error(e);
    }
  }
};

exports.seedData = seedData;

exports.connectDb = connectDb;
