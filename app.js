// express server
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.json());
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
  res.send({ message: 'Server is running' });
});

app.post('/get-key', (req, res) => {
  if (req.body.message === process.env.SECRET) {
    res.send({ key: process.env.KEY });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
