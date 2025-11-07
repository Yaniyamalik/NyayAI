import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Please define MONGO_URI in .env.local");
}

// Prevent multiple connections in dev/hot reload
let isConnected = false;

const DbConnect = async () => {

  if (isConnected) {
    console.log("⚡ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "NyayAI", // ✅ your DB name (optional)
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default DbConnect;

