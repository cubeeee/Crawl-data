import { Router } from "express";
import productController from "../controllers/productController";
import middlewareController from "../controllers/middlewareController";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.resolve(__dirname, "../../uploads"))) {
      fs.mkdirSync(path.resolve(__dirname, "../../uploads"), {
        recursive: true,
      });
    }
    cb(null, path.resolve(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

router.post("/add", upload, productController.add);
router.post("/edit/:id([0-9a-zA-Z]{24})",middlewareController.verifyToken, upload,  productController.edit);
router.post("/delete/:id([0-9a-zA-Z]{24})",middlewareController.verifyToken, productController.delete);
router.post("/getAll",middlewareController.verifyToken, productController.getAll);

// router.get("/autoAdd", productController.autoAdd);

export default router;
