const mongoose = require('mongoose');
const { User } = require('./models/User');
const { Question } = require('./models/Question');
const { Feedback } = require('./models/Feedback');

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

const createQuestions = async () => {
  const textQuestion = new Question({
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    type: 'question',
  });

  await textQuestion.save();

  const optionsQuestion = new Question({
    options: {
      belowAvg: `You may have done one or the following:  Maybe you were mostly quiet in meetings and when you had something on your mind, you brought it to the team afterward. Or, you had feedback that would be valuable to go, but you found it too difficult. Or, you had an opportunity to grow by doing something uncomfortable but you didn’t`,
      avg: 'You sometimes participate in meetings but you feel that they don’t always bring up important things when they should.',
      aboveAvg: 'I and others can count on your courage to help the team do what is right.',
    },
    type: 'options',
  });

  await optionsQuestion.save();

  const scaleQuestion = new Question({
    question: 'Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah croissant candy canes bonbon candy.',
    scaleRating: 0,
    type: 'scaleRating',
  });

  await scaleQuestion.save();

  const textQuestion2 = new Question({
    question: 'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.',
    answer: 'Lorem ipsum dolor amet mustache knausgaard +1',
    type: 'question',
  });

  await textQuestion2.save();

  const optionsQuestion2 = new Question({
    question: 'How did I do with the office cupcakes?',
    options: {
      belowAvg: `Missed the bar completely`,
      avg: 'Did exactly what was asked',
      aboveAvg: 'Blew us away',
    },
    answer: 'avg',
    skipeed: true,
    type: 'options',
  });

  await optionsQuestion2.save();

  const scaleQuestion2 = new Question({
    question: 'Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah croissant candy canes bonbon candy.',
    answer: '7',
    type: 'scaleRating',
  });

  await scaleQuestion2.save();

  return [
    textQuestion,
    textQuestion2,
    optionsQuestion,
    optionsQuestion2,
    scaleQuestion,
    scaleQuestion2,
  ];
};

const createFeedback = async (users, questions) => {
  const myFeedback = new Feedback({
    from: users.chris._id,
    to: users.jane._id,
    questions: questions.map(q => q._id),
  });

  await myFeedback.save();

  const chrisFeedback = new Feedback({
    to: users.chris._id,
    questions: questions.map(q => q._id),
  });

  await chrisFeedback.save();

  const nicoFeedback = new Feedback({
    to: users.chris._id,
    from: users.jane._id,
    questions: questions.map(q => q._id),
  });

  await nicoFeedback.save();

  const nathanielFeedback = new Feedback({
    to: users.nathaniel._id,
    from: users.jane._id,
    questions: questions.map(q => q._id),
  });

  await nathanielFeedback.save();

  const denisFeedback = new Feedback({
    to: users.denis._id,
    questions: questions.map(q => q._id),
  });

  await denisFeedback.save();

  const paulFeedback = new Feedback({
    to: users.paul._id,
    from: users.jane._id,
    questions: questions.map(q => q._id),
  });

  await paulFeedback.save();
};

const seedData = async () => {
  const users = await User.find({});
  if (!users.length) {
    try {
      const users = await createUsers();
      const questions = await createQuestions();
      await createFeedback(users, questions);
    } catch (e) {
      console.error(e);
    }
  }
};

exports.seedData = seedData;

exports.connectDb = connectDb;
