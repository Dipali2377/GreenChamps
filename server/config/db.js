import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL ||
        "mongodb+srv://dipalim680:Greenchamps123@cluster0.1bt3psm.mongodb.net/"
    );
    console.log(`Connected to DB successfully...!`);
  } catch (error) {
    console.log(`Error while connecting to DB`, error);
  }
};

export default connectDB;
