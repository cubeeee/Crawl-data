import { Request, Response } from "express";
import Product from "../model/Product";
import { IProductDocument } from "../typing/typing";
import { deletePNGFile, generateName, randomString } from "../utils";
import { generateMongoQuery } from "../utils/datatable";

import fs from "fs";
import path from "path";


const productController = {
  add: async (req: Request, res: Response) => {
    const image = req.file ? req.file.path.split("\\").pop() : undefined;
    const newProduct = await new Product(req.body as IProductDocument);
    newProduct.image = image;
    await newProduct
      .save()
      .then((product) => {
        res.json({
          status: 1,
          message: "Add new product successfully",
          data: product,
        });
      })
      .catch((err) => {
        res.json({
          status: 0,
          message: err.message.toString(),
        });
      });
  },

  edit: async (req: Request, res: Response) => {
    console.log(req.file);
    try {
        const image = req.file ? req.file.path.split("\\").pop() : undefined;
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          req.body as IProductDocument
        );

        if (image) {
          const oldImage = product?.image;
          if (!oldImage) {
            return;
          }
          deletePNGFile(oldImage);
          product.image = image;
        }
        if (product) {
          await product.save();
          res.json({
            status: 1,
            message: "Edit product successfully",
          });
        }
    } catch (error) {
      res.json({
        status: 0,
        message: error,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product?.image) {
      return;
    }
    deletePNGFile(product.image);
    res.json({
      status: 1,
      message: "Delete product successfully",
    });
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json({
        status: 1,
        message: "Get product successfully",
        data: product,
      });
    } catch (error) {
      res.json({
        status: 0,
        message: error,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    const { find, limit, skip, sort } = generateMongoQuery(req.body);
    const count = await Product.countDocuments(find);
    const users = await Product.find(find).sort(sort).limit(limit).skip(skip).populate({
      path: "system",
    });
    res.json({
      success: true,
      data: users,
      recordsFiltered: count,
    });
  },

  // autoAdd: async (req: Request, res: Response) => {
  //   const pathFile = path.resolve(__dirname, "../../svg");
  //   const files = fs.readdirSync(pathFile);
  //   for (const file of files) {
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //     const newPath = path.resolve(__dirname, '..', '..', 'uploads', `${uniqueSuffix}-${file}`);
  //     const oldPath = path.resolve(__dirname, '..', '..', 'svg', file);
  //     fs.copyFileSync(oldPath, newPath);
  //     const product = await new Product({
  //       title: generateName(file),
  //       vesion: '4.56v',
  //       image: newPath,
  //       system: randomString(["Android", "Mac", "Window"]),
  //       description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ",
  //       star: 4,
  //       size: "35.2 MB",
  //       license: "Free",
  //       language: "English",
  //       developer: "Google LLC",
  //       lastUpdate: "2021-05-20",
  //       isTopDownload: false,
  //       releaseDate: "2021-05-20",
  //     });
  //     await product.save();
  //   }

  // },
};

export default productController;
