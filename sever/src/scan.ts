require("dotenv").config();
import mongoose from "mongoose";
import logger from "./helpers/logger";
import { scanAll, scanUid, scanBirthdayById} from "./utils/index";
import Proxy from "./models/Proxy";
import { HttpsProxyAgent } from "https-proxy-agent";
import { convertName, generatePassword } from "./utils/password";


(async() => {
    const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
    // MongoDB connection 
    await mongoose.connect(mongoUrl).then(async() => {
      logger.success("Connected to MongoDB");
    // Scan for Uid and save to DB
      // await scanUid("100085424240501"); 
    // Scan for all 
    //  await scanAll();   
    const proxy = await Proxy.findOne({ status: true });
    const ip = proxy?.ip?.trim();
    const port = proxy?.port;
    const protocol = 'http';
    const username = proxy?.username.trim();
    const password = proxy?.password.trim();
    const agent = new HttpsProxyAgent(`${protocol}://${username}:${password}@${ip}:${port}`);
    const cookie = ''
    await scanBirthdayById('100085424240501',agent, cookie);
      // logger.debug(generatePassword('Nguyên Anh Tú', '15/08/2001'));
    }).catch((error) => {
      logger.error("MongoDB connection error. Please make sure MongoDB is running. " + error);
      process.exit(1);
    });
  })();