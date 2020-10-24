import { UserModel, GroupModel, UserGroupModel } from '../models';
import UserService from './user.service';
import GroupService from './group.service';
import UserGroupService from './userGroup.service';
import AuthService from './auth.service';

const userService = new UserService(UserModel);
const groupeService = new GroupService(GroupModel);
const userGroupService = new UserGroupService(UserGroupModel);
const authService = new AuthService(UserModel);

export { userService, groupeService, userGroupService, authService };
