import winston from '../config/winston';

export default function logger(req, res, next) {
    res.on('finish', () => {
        const { method, originalUrl, body } = req;
        const { statusCode } = res;
        const message = `METHOD: ${method}, STATUS: ${statusCode}, URL: ${originalUrl}, REQUEST_BODY: ${JSON.stringify(body)}`;
        winston.info(message);
    });
    next();
}
