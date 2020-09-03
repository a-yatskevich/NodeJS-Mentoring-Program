export default class UserController {
    constructor(UserService) {
        this.UserService = UserService;
        this.getUserById = this.getUserById.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async addUser(req, res) {
        const user = await this.UserService.addUser(req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User with such login is already exist');
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        const user = await this.UserService.getUserById(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User does not exist');
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await this.UserService.updateUser(id, updates);

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User does not exist');
        }
    }

    async removeUser(req, res) {
        const { id } = req.params;
        const deletedUser = await this.UserService.removeUser(id);

        if (deletedUser) {
            res.status(200).send('User is deleted');
        } else {
            res.status(404).send('User does not exist');
        }
    }

    async getUsers(req, res) {
        const { login, limit } = req.query;
        const usersToSend = await this.UserService.getUsers(login, limit);

        res.json(usersToSend);
    }
}
