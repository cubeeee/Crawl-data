import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        role: "Admin" | "User";
        iat: number;
        exp: number;
      };
    }
  }
}
