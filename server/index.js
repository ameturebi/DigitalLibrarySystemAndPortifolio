const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./src/config/supabaseClient');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Route Imports
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { apiLimiter, authLimiter } = require('./src/middleware/rateLimiter');

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/books', apiLimiter, bookRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Author Portfolio & Digital Library API is running');
});

// Error handling middleware must be after all routes
const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
