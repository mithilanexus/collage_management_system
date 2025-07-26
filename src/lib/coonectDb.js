import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_Stirng);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
