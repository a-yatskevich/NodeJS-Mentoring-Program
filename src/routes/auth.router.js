import express from 'express';
import { userLoginValidator } from '../validators/auth.validator';
import { AuthCtrl } from '../controllers';

const router = express.Router();

router.post('/', userLoginValidator, AuthCtrl.login);

export default router;
