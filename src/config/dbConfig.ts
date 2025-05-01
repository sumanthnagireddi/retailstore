import mongoose from "mongoose";

const DATABASE = `mongodb://0.0.0.0:27017/retailstore`;
export const connectToDB = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log("connection established");
  } catch (error) {
    console.log("connection error", error);
  }
};
