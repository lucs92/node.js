import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;