const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose 7+ doesn't need useNewUrlParser and useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`\n✅ MongoDB Connected Successfully!`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);
    
    return conn;
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Failed!`);
    console.error(`📛 Error: ${error.message}\n`);
    
    // Don't exit the process, let the server run in demo mode
    console.log('⚠️  Starting server without database (Demo Mode)');
    return null;
  }
};

module.exports = connectDB;