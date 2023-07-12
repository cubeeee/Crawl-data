import { Router } from "express";
import facebookController from "../controllers/facekookController";
import middlewareController from "../controllers/middlewareController";

const router = Router();

router.post("/add", facebookController.add);
router.post("/edit/:id", facebookController.edit);
router.post("/delete/:id", facebookController.delete);
router.post("/getAll", facebookController.get);
router.get("/export", facebookController.export);


export default router;