import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }

    if (!process.env.MongoDB_Stirng) {
      throw new Error("MongoDB_Stirng is not defined in environment variables");
    }

    const options = {
      dbName: "collage_management_system",
      autoIndex: true,
    };

    await mongoose.connect(process.env.MongoDB_Stirng, options);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;
