import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config  from '../config';

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                const error = createError('Failed to authenticate token', 403);
                return next(error);
            }
            req.user = {
                id: decoded.sub
            };
            next();
        });
    } else {
        const error = createError('You need to be authorized. Please provide your token', 401);
        return next(error);
    }
};

export default authMiddleware;
