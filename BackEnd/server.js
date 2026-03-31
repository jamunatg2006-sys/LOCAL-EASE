const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const app = express();
let dbConnected = false;

// Connect to database
connectDB().then(conn => {
  if (conn) {
    dbConnected = true;
    console.log('🎉 Database ready for connections!');
  }
}).catch(err => {
  console.log('⚠️  Running in demo mode without database');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/ServiceRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server running',
    database: dbConnected ? 'Connected ✅' : 'Demo Mode ⚠️',
    timestamp: new Date().toISOString()
  });
});

// Base route
app.get('/', (req, res) => {
  res.json({
    name: 'LocalEase API',
    version: '1.0.0',
    status: 'Online',
    database: dbConnected ? 'Connected' : 'Demo Mode',
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      health: '/api/health'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health\n`);
});