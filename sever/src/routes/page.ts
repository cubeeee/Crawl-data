import { Router } from "express";
import pageController from "../controllers/pageController";

const router = Router();

router.post('/', pageController.test);


export default router;