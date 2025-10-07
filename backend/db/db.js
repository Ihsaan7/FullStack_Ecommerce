import mongoose from "mongoose";

async function startDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

export default startDB;
