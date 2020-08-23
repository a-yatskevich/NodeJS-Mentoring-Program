import { v4 as uuid } from 'uuid';

class User {
    constructor({ login, password, age }) {
        this.age = age;
        this.id = uuid();
        this.isDeleted = false;
        this.login = login;
        this.password = password;
    }

    getModel() {
        const { isDeleted, ...sanitizedUser } = this;
        return !isDeleted && sanitizedUser;
    }

    delete() {
        this.isDeleted = true;
    }
}

export default User;
