class GroupController {
    constructor(GroupService, UserGroupService) {
        this.GroupService = GroupService;
        this.UserGroupService = UserGroupService;
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
    }

    async addNewGroup(req, res) {
        const group = req.body;
        const newGroup = await this.GroupService.addNewGroup(group);

        res.json(newGroup);
    }

    async getAllGroups(req, res) {
        const groups = await this.GroupService.getAllGroups();

        res.json(groups);
    }

    async getGroup(req, res) {
        const id = req.params.id;
        const group = await this.GroupService.getGroup(id);

        if (group) {
            res.json(group);
        } else {
            res.status(404).send('Group with such id does not exist');
        }
    }

    async removeGroup(req, res) {
        const id = req.params.id;
        const removedGroup = await this.GroupService.removeGroup(id);

        if (removedGroup) {
            res.json(removedGroup);
        } else {
            res.status(404).send('Group with such id does not exist');
        }
    }

    async updateGroup(req, res) {
        const id = req.params.id;
        const updates = req.body;
        const updatedGroup = await this.GroupService.updateGroup(id, updates);

        if (updatedGroup) {
            res.json(updatedGroup);
        } else {
            res.status(404).send('Group with such id does not exist');
        }
    }

    async addUsersToGroup(req, res) {
        const { id: groupId } = req.params;
        const { id: userId } = req.query;
        try {
            const addedUsers = await this.UserGroupService.addUsersToGroup(groupId, userId);
            res.send(addedUsers);
        } catch (err) {
            res.status(404).send('User was not added');
        }
    }
}
export default GroupController;
