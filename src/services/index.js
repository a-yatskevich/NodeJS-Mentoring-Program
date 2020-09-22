import { UserModel, GroupModel } from '../models';
import UserService from './user.service';
import GroupService from './group.service';

const userService = new UserService(UserModel);
const groupeService = new GroupService(GroupModel);

export { userService, groupeService };
