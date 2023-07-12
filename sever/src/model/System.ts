import { Schema, model, Document } from "mongoose";
import { ISystem } from "../typing/typing";

const schema = new Schema<ISystem>(
  {
    title: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);



const System = model<ISystem>("System", schema);

export default System;
