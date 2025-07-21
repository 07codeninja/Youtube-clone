const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load env variables
dotenv.config();

require('./Connection/conn');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // React front-end
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', require('./Routes/user'));
app.use('/api', require('./Routes/video'));
app.use('/api', require('./Routes/comment'));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
