import mongoose from "mongoose";

async function startDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn(
        "⚠️  MONGODB_URI not set. Database features will be unavailable."
      );
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.warn(
      "⚠️  Continuing without database. API will be available but database operations will fail."
    );
  }
}

export default startDB;
