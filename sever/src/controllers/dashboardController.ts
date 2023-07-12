import { Request, Response } from "express";
import User from "../model/User";
import { generateRegex } from "../utils";
import { generateMongoQuery } from "../utils/datatable";
import Product from "../model/Product";

const dashboardController = {
  home: async (req: Request, res: Response) => {
    const productCount = await Product.find().countDocuments();
    const userCount = await User.find().countDocuments();
    res.json({
      status: 1,
      message: "Success",
      data: {
        productCount,
        userCount,
      }
    });
  }
}; 

export default dashboardController;