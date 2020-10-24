import jwt from 'jsonwebtoken';
import config from '../config';

export default class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(login, password) {
        const user = await this.userModel.findByLoginAndPassword(login, password);

        if (user) {
            const payload = {
                sub: user.id
            };
            return jwt.sign(payload, config.jwtSecret, {
                expiresIn: config.tokenExpireTime
            });
        }
    }
}
