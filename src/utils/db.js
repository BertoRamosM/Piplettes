import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    console.log("MONGO URI:", process.env.MONGO); // Log the MONGO URI to check if it's correctly loaded
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Connection failed:", error);
    throw new Error("connection failed");
  }
};

export default connect;
