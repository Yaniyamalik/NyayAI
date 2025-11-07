import mongoose from 'mongoose';


const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Global variable for reuse (avoids re-connecting)
let isConnected = false;

const DbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URIL, {
      dbName: 'Nayai', 
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  }
};

export default DbConnect;
