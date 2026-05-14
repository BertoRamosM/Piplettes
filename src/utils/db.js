import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState !== 0) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("MongoDB connection failed");
  }
};

export default connect;
