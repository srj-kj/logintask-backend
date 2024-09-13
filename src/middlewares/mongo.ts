import mongoose from 'mongoose';

export const mongoUri = process.env.MONGOLAB_URI as string;

export const connectMongo = async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to DB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
