import { Router } from "express";
import dashboardController from "../controllers/dashboardController";
import middlewareController from "../controllers/middlewareController";

const router = Router();

router.get("/", middlewareController.verifyToken, dashboardController.home);

export default router;
