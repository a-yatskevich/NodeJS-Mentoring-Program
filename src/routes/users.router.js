import { Router } from 'express';
import { getUsersQueryValidator, userModelValidator, userIdParamValidator } from '../validators/users';
import { UserCtrl } from '../controllers';

const router = Router();

router
    .get('/', getUsersQueryValidator, UserCtrl.getUsers)
    .get('/:id', userIdParamValidator, UserCtrl.getUserById)
    .post('/', userModelValidator, UserCtrl.addUser)
    .put('/:id', userModelValidator, userIdParamValidator, UserCtrl.updateUser)
    .delete('/:id', userIdParamValidator, UserCtrl.removeUser);

export default router;
