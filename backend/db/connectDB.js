import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.log('error while connecting to database', error);
    process.exit(1); 0 // 0 means success and 1 means failure
  }
}
