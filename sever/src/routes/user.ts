import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/getAll', userController.get);

export default router;