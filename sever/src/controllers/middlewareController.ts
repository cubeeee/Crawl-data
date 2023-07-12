import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const middlewareController = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
       const token = req.headers["authorization"]?.split(" ")[1];
      if(token) {
        const decode = await jwt.verify(
          token,
          process.env.JWT_SECRET_KEY as string
        );
        req.user = decode as any;
        next();
      } else {
        res.json({ 
          status: 0,
          message: "Unauthorized" 
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: 0,
        message: error,
      });
    }
  },

  verifyRole: async (req: Request, res: Response, next: NextFunction) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role === "Admin") {
        next();
      } else {
        res.json({ 
          status: 0,
          message: "You don't have permission to do this action"
        });
      }
    });
  },
};

export default middlewareController;
