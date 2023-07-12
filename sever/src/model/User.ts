import { Schema, model, Document } from "mongoose";
import { IUserDocument, ERole } from "../typing/typing";

const schema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ERole.Admin, ERole.User],
      default: ERole.User,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUserDocument>("User", schema);

export default User;
