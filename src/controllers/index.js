import UserController from './user.controller';
import { userService } from '../services';

const UserCtrl = new UserController(userService);

export { UserCtrl };
