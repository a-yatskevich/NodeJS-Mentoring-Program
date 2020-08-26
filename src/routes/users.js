import { Router } from 'express';
import { getUsersQueryValidator, userModelValidator, userIdParamValidator } from '../validators/users';
import {
    getUserById,
    addUser,
    updateUser,
    removeUser,
    getUsers
} from '../controllers/users';


const router = Router();

router
    .get('/', getUsersQueryValidator, getUsers)
    .get('/:id', userIdParamValidator, getUserById)
    .post('/', userModelValidator, addUser)
    .put('/:id', userModelValidator, userIdParamValidator, updateUser)
    .delete('/:id', userIdParamValidator, removeUser);

export default router;
