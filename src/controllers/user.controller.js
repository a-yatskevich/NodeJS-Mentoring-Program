import createError from 'http-errors';
import { getInternalError } from '../helpers';

const NOT_FOUND = 'User does not exist';
const ALREADY_EXIST = 'User with such login is already exist';

export default class UserController {
    constructor(UserService) {
        this.UserService = UserService;
        this.getUserById = this.getUserById.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async addUser(req, res, next) {
        try {
            const user = await this.UserService.addUser(req.body);
            if (user) {
                res.json(user);
            } else {
                const error = createError(404, ALREADY_EXIST);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'addUser';
            const params = { user: req.body };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.UserService.getUserById(id);

            if (user) {
                res.json(user);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'getUserById';
            const params = { id: req.params };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await this.UserService.updateUser(id, updates);

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'updateUser';
            const params = { id: req.params.id,  updates: req.body };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async removeUser(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await this.UserService.removeUser(id);

            if (deletedUser) {
                res.json(deletedUser);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'removeUser';
            const params = { id: req.params.id };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const { login, limit } = req.query;
            const usersToSend = await this.UserService.getUsers(login, limit);

            if (usersToSend) {
                res.json(usersToSend);
            } else {
                const error = createError(404, NOT_FOUND);
                return next(error);
            }
        } catch ({ message }) {
            const method = 'getUsers';
            const params = { login: req.query.login, limit: req.query.limit };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }
}
