import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/greenchampsDB"
    );
    console.log(`Connected to DB successfully...!`);
  } catch (error) {
    console.log(`Error while connecting to DB`, error);
  }
};

export default connectDB;
