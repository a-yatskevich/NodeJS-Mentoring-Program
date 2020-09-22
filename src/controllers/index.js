import UserController from './user.controller';
import GroupController from './group.controller';
import { userService, groupeService, userGroupService } from '../services';

const UserCtrl = new UserController(userService);
const GroupCtrl = new GroupController(groupeService, userGroupService);

export { UserCtrl, GroupCtrl };
