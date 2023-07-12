import { Router } from "express";
import authController from "../controllers/authController";
import middlewareController from "../controllers/middlewareController";
const router = Router();

router.post("/add", middlewareController.verifyRole, authController.add);
router.post(`/edit/:id([0-9a-zA-Z]{24})`,middlewareController.verifyRole, authController.edit);
router.post(`/delete/:id([0-9a-zA-Z]{24})`,middlewareController.verifyRole, authController.delete);
router.post("/login", authController.login);
router.get("/isLogin", middlewareController.verifyToken, authController.isLogin);

export default router;
