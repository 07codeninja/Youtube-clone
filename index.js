const express = require('express');
const dotenv = require('dotenv'); // ✅ add this line
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config(); // ✅ now this will work
require('./Connection/conn'); // ✅ MongoDB connection

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
const userRoutes = require('./Routes/user');
const videoRoutes = require('./Routes/video');
const commentRoutes = require('./Routes/comment');

app.use('/api', userRoutes);
app.use('/api', videoRoutes);
app.use('/api', commentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
