require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
import logger from "./helpers/logger";
import cors from "cors";
// Routes
import proxyRoute  from "./routes/proxies";
import facebookeRoute from "./routes/facebook";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 3000;

(async() => {
  const app = express();
  app.use(express.json());  
  app.use(cors());
  // Routes
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/api/proxy", proxyRoute);
  app.use("/api/facebook", facebookeRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute)


  // MongoDB connection && Server listen
  await mongoose.connect(mongoUrl).then(async() => {
    logger.success("Connected to MongoDB");
    app.listen(port, () => {
      logger.success(`Server is running on port ${port}`);
    });
  }).catch((error) => {
    logger.error("MongoDB connection error. Please make sure MongoDB is running. " + error);
    process.exit(1);
  });
})();


