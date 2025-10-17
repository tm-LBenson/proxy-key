const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Server is running' });
});

for (let i = 0; i < 5; i++) {
  const suffix = i === 0 ? '' : String(i + 1);
  const route = `/get-key${suffix}`;
  const envName = `key${suffix}`;
  app.post(route, (req, res) => {
    const value = process.env[envName];
    if (value) {
      res.send({ key: value });
    } else {
      res.status(404).send({ message: 'Key not configured' });
    }
  });
}

app.use((req, res) => {
  res.status(404).send({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
