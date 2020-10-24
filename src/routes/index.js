import { Router } from 'express';
import usersRoute from './users.router';
import groupRoute from './group.router';
import authRoute from './auth.router';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use('/users', authMiddleware, usersRoute);
router.use('/groups', authMiddleware, groupRoute);
router.use('/login', authRoute);

export default router;
