class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.addUser = this.addUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async addUser(user) {
        const allUsers = await this.UserModel.findAll();
        const isExistingUser = allUsers.some(({ login }) => user.login === login);
        if (isExistingUser) {
            return null;
        }
        return await this.UserModel.addUser(user);
    }

    async getUserById(id) {
        return await this.UserModel.findById(id);
    }

    async updateUser(id, updates) {
        return await this.UserModel.updateUser(id, updates);
    }

    async removeUser(id) {
        return await this.UserModel.destroyById(id);
    }

    async getUsers(login, limit) {
        if (login || limit) {
            return await this.UserModel.findByLoginAndLimit(login, limit);
        }
        return await this.UserModel.findAll();
    }
}

export default UserService;
