import createError from 'http-errors';

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
        } catch (err) {
            const error = createError(500, err.message);
            error.controllerMethod = 'addUser';
            error.methodArguments = JSON.stringify({ user: req.body });
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
        } catch (err) {
            const error = createError(500, err.message);
            error.controllerMethod = 'getUserById';
            error.methodArguments = JSON.stringify({ id: req.params });
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
        } catch (err) {
            const error = createError(500, err.message);
            error.controllerMethod = 'updateUser';
            error.methodArguments = JSON.stringify({ id: req.params.id,  updates: req.body });
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
        } catch (err) {
            const error = createError(500, err.message);
            error.controllerMethod = 'removeUser';
            error.methodArguments = JSON.stringify({ id: req.params.id });
            return next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const { login, limit } = req.query;
            const usersToSend = await this.UserService.getUsers(login, limit);

            res.json(usersToSend);
        } catch (err) {
            const error = createError(500, err.message);
            error.controllerMethod = 'getUsers';
            error.methodArguments = JSON.stringify({ login: req.query.login, limit: req.query.limit });
            return next(error);
        }
    }
}
