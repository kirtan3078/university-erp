require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI) {
  console.warn("⚠️ MONGODB_URI is not defined. Set it in the environment before deploying.");
}

if (!JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not defined. Set it in the environment before deploying.");
}

const startServer = async () => {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log("✅ MongoDB Connected");
    } else {
      console.warn("⚠️ MongoDB unavailable; continuing in demo mode");
    }
  } catch (err) {
    console.warn("⚠️ MongoDB unavailable; continuing in demo mode");
    console.warn(err.message);
  }

  app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
};

startServer();