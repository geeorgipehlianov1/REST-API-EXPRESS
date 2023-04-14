const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/furnitire', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection faild.');
    process.exit(1);
  }

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
  });

  app.listen(3030, () => console.log('Server is running on port 3030...'));
}

start();