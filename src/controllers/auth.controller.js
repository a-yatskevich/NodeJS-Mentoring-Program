import createError from 'http-errors';
import { getInternalError } from '../helpers';

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = this.login.bind(this);
    }

    async login(req, res, next) {
        const { login, password } = req.body;

        try {
            const token = await this.authService.authenticate(login, password);

            if (token) {
                res.json(token);
            } else {
                const error = createError(403, 'Bad username or password');
                return next(error);
            }
        } catch ({ message }) {
            const method = 'login';
            const params = { login: req.body.login, password: req.body.password };
            const error = getInternalError({ message, method, params });
            return next(error);
        }
    }
}
