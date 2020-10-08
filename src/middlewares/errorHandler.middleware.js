// eslint-disable-next-line no-unused-vars
const errorHandler = (logger) => (err, req, res, next) => {
    const { method, originalUrl } = req;
    const { statusCode, controllerMethod, methodArguments } = err;
    let message = `METHOD: ${method}, STATUS: ${statusCode}, URL: ${originalUrl}`;
    if (controllerMethod) {
        message = message.concat(`, ControllerMethod: ${controllerMethod}`);
    }
    if (methodArguments) {
        message = message.concat(`, methodArguments: ${methodArguments}`);
    }
    logger.error(message);
    res.status(err.status).send(err.message);
};

export default errorHandler;
