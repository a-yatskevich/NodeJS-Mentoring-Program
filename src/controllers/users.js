import User from '../models/User';

const users = [];

export const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find((item) => item.id === id && !item.isDeleted);
    if (user) {
        res.json(user.getModel());
    } else {
        res.status(404).send('User does not exist');
    }
};

export const addUser = (req, res) => {
    console.log(1111, req.body);
    const user = new User(req.body);
    users.push(user);
    res.json(user.getModel());
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id && !user.isDeleted);
    if (userIndex >= 0) {
        const updates = req.body;
        const updatedUser = Object.assign(users[userIndex], updates);
        users[userIndex] = updatedUser;
        res.json(updatedUser.getModel());
    } else {
        res.status(404).send('User does not exist');
    }
};

export const removeUser = (req, res) => {
    const { id } = req.params;
    const user = users.find((item) => item.id === id && !item.isDeleted);
    if (user) {
        user.delete();
        res.status(200).send('User is deleted');
    } else {
        res.status(404).send('User does not exist');
    }
};

export const getUsers = (req, res) => {
    const { login, limit  } = req.query;
    let usersToSend = users
        .filter(user => !user.isDelted)
        .map(user => user.getModel())
        .sort((a, b) => a.login.localeCompare(b.login));

    if (login) {
        usersToSend = usersToSend.filter((user) => user.login.includes(login));
    }
    if (limit) {
        usersToSend = usersToSend.splice(0, limit);
    }

    res.json(usersToSend);
};
