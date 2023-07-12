import { Router } from "express";
import proxyController from "../controllers/proxyController";

const router = Router();

router.post("/add", proxyController.add);
router.post("/edit/:id", proxyController.edit);
router.post("/delete/:id", proxyController.delete);
router.post("/getAll", proxyController.get);

export default router;