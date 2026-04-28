require('dotenv').config();
const express = require('express');

const app = express();
const { PORT } = require('./config/app');

app.get('/liveness', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
