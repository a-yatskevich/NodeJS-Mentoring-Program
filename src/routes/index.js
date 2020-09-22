import { Router } from 'express';
import usersRoute from './users.router';
import groupRoute from './group.router';

const router = Router();

router.use('/users', usersRoute);
router.use('/groups', groupRoute);

export default router;
