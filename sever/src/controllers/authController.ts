import { IUserDocument } from "../typing/typing";
import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../helpers/logger";

const authController = {
  add: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        res.json({
          status: 'error',
          message: "Username already exists",
        });
      } else {
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(pass, salt);
        const newUser = await new User({
          username: req.body.username,
          password: hashPassword,
        });
        const savedUser = await newUser.save();
        const { password, role, username, ...others } =
        savedUser.toObject();
        res.json({
          status: 'success',
          message: "Add new user successfully",
          data: { ...others },
        });
      } 
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body as IUserDocument);
      res.json({
        status: 'success',
        message: "Edit user successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({
        status: 'success',
        message: "Delete user successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({
          status: 'error',
          message: "Username does not exists",
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.json({
          status: 'error',
          message: "Password is not correct",
        });
      }
      if (user && validPassword) {
        const accessToken = await jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "1h" }
        );
        const { password: pass, ...others } = user.toObject();
        logger.success(`User ${user.username} login successfully`);
        return res.json({
          status: 'success',
          message: "Login successfully",
          data: { ...others },
          token: accessToken,
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        status: 'error',
        message: error,
      });
    }
  },
  isLogin: async (req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: req.user
    })
  }
};

export default authController;
