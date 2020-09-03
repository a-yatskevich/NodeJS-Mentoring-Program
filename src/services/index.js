import { UserModel } from '../models';
import UserService from './user.service';

const userService = new UserService(UserModel);
export { userService };
