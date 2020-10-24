import UserController from './user.controller';
import GroupController from './group.controller';
import AuthController from './auth.controller';
import { userService, groupeService, userGroupService, authService } from '../services';

const UserCtrl = new UserController(userService);
const GroupCtrl = new GroupController(groupeService, userGroupService);
const AuthCtrl = new AuthController(authService);

export { UserCtrl, GroupCtrl, AuthCtrl };
