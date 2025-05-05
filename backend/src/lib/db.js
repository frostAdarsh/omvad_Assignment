import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "OMVAD_GROUP",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
