import mongoose from "mongoose";

async function startDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn(
        "⚠️  MONGODB_URI not set. Database features will be unavailable."
      );
      return;
    }

    console.log("🔄 Connecting to MongoDB...");
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log("✅ MongoDB Connected successfully.");
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });
    
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.warn(
      "⚠️  Continuing without database. API will be available but database operations will fail."
    );
    throw err; // Re-throw to let the caller handle it
  }
}

export default startDB;
