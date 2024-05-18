import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    console.log('Connecting to MongoDB:', process.env.MONGODB_URI); // Log the connection string
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


