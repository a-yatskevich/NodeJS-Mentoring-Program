class UserGroupService {
    constructor(UserGroupModel) {
        this.UserGroupModel = UserGroupModel;
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
    }

    async addUsersToGroup(groupId, userIds) {
        return await this.UserGroupModel.addUsersToGroup(groupId, userIds);
    }
}

export default UserGroupService;
