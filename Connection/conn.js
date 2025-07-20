const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://chat-box-user:gVzQ9wdVr5bmIG5r@cluster0.qyd9c32.mongodb.net/youtubeBackend?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
