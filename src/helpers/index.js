import createError from 'http-errors';

export const getInternalError = ({ message, method, params = {} }) => {
    const error = createError(500, message);
    error.controllerMethod = method;
    error.methodArguments = JSON.stringify(params);
    return error;
};
