import { Request, Response } from "express"
import User from "../models/User";
import { generateMongoQuery } from "../utils/database";

const userController = {
  get: async(req: Request, res: Response ) => {
    const { find, limit, skip, sort } = generateMongoQuery(req.body);
    const count = await User.countDocuments(find);
    const users = await User.find(find).sort(sort).limit(limit).skip(skip);
    res.json({
    success: true,
    data: users,
    recordsFiltered: count,
    });
  }
}

export default userController