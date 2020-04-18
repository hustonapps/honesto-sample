require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = 4040;
const { connectDb, seedData } = require('./db');

app.use('/build/static', express.static(path.join(__dirname, '../build/static')));
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

connectDb().then(async () => {
  console.log('db connected');
  seedData();
  app.listen(port, () => console.log(`Honesto sample listening on port${port}`));
}).catch((err) => {
  console.error(err, 'db connection failed');
});
