import createError from 'http-errors';
import { getInternalError } from '../helpers';

const NOT_FOUND = 'Group with such id does not exist';

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

    async addNewGroup(req, res, next) {
        try {
            const group = req.body;
            const newGroup = await this.GroupService.addNewGroup(group);

            res.json(newGroup);
        } catch ({ message }) {
            const method = 'addNewGroup';
            const params = { group: req.body };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async getAllGroups(req, res, next) {
        try {
            const groups = await this.GroupService.getAllGroups();

            res.json(groups);
        } catch ({ message }) {
            const method = 'addNewGroup';
            const error = getInternalError({ message, method });
            return next(error);
        }
    }

    async getGroup(req, res, next) {
        try {
            const { id } = req.params;
            const group = await this.GroupService.getGroup(id);

            if (group) {
                res.json(group);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'getGroup';
            const params = { id: req.params.id };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async removeGroup(req, res, next) {
        try {
            const { id } = req.params;
            const removedGroup = await this.GroupService.removeGroup(id);

            if (removedGroup) {
                res.json(removedGroup);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'removeGroup';
            const params = { id: req.params.id };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async updateGroup(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedGroup = await this.GroupService.updateGroup(id, updates);

            if (updatedGroup) {
                res.json(updatedGroup);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'updateGroup';
            const params = { id: req.params.id, updates: req.body };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async addUsersToGroup(req, res, next) {
        try {
            const { id: groupId } = req.params;
            const { id: userId } = req.query;
            try {
                const addedUsers = await this.UserGroupService.addUsersToGroup(groupId, userId);
                res.send(addedUsers);
            } catch (err) {
                const error = createError(404, 'User was not added');
                return next(error);
            }
        } catch ({ message }) {
            const method = 'addUsersToGroup';
            const params = { groupId: req.params.id, userId: req.query.id };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }
}
export default GroupController;
