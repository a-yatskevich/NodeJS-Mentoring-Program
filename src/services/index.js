import { UserModel, GroupModel, UserGroupModel } from '../models';
import UserService from './user.service';
import GroupService from './group.service';
import UserGroupService from './userGroup.service';

const userService = new UserService(UserModel);
const groupeService = new GroupService(GroupModel);
const userGroupService = new UserGroupService(UserGroupModel);

export { userService, groupeService, userGroupService };
