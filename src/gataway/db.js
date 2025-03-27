import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async (url) => {
  try {
    if(process.env.NODE_ENV === 'test'){
     const memoryServer = await MongoMemoryServer.create();
     await mongoose.connect(memoryServer.getUri(), {dbName: process.env.DB_NAME});
     console.log('MemoryDb Connected...')
    }else{
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;