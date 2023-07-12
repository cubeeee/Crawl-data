import { Schema, model } from "mongoose";
import { IProductDocument } from "../typing/typing";


const schema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    vesion: {
      type: String,
      required: true,
    },
    system: [
      {
        type: Schema.Types.ObjectId,
        ref: "System"
      }
    ],
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    lastUpdate: {
      type: String,
      required: true,
    },
    isTopDownload: {
      type: Boolean,
      default: false,
    },
    linkDownload: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = model<IProductDocument>("Product", schema);

export default Product;
