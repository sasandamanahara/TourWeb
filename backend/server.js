
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');




const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3001' // Allow requests from this origin
}));

// Load environment variables from .env file
dotenv.config();


const port = process.env.PORT ;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});