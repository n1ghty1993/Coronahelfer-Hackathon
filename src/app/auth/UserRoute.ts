import { Router } from 'express';
import UserController from './UserController';

const router = Router();

router.get('/', UserController.search);
router.get('/me', UserController.me);
router.delete('/', UserController.delete);

export default router;
