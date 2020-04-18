require('dotenv').config();
const express = require('express');
const app = express();
const port = 4040;
const { connectDb, seedData } = require('./db');

connectDb().then(async () => {
  console.log('db connected');
  seedData();
  app.listen(port, () => console.log(`Honesto sample listening on port${port}`));
}).catch((err) => {
  console.error(err, 'db connection failed');
});
