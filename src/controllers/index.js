import UserController from './user.controller';
import GroupController from './group.controller';
import { userService, groupeService } from '../services';

const UserCtrl = new UserController(userService);
const GroupCtrl = new GroupController(groupeService);

export { UserCtrl, GroupCtrl };
