class GroupService {
    constructor(GroupModel) {
        this.GroupModel = GroupModel;
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    async addNewGroup(user) {
        return await this.GroupModel.addGroup(user);
    }

    async getAllGroups() {
        return await this.GroupModel.getAllGroups();
    }

    async getGroup(id) {
        return await this.GroupModel.getGroupById(id);
    }

    async removeGroup(id) {
        return await this.GroupModel.destroyById(id);
    }

    async updateGroup(id, updates) {
        return await this.GroupModel.updateGroup(id, updates);
    }
}

export default GroupService;
