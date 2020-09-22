import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({});

const userModelSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

const userIdParamsSchema  = Joi.object({
    id: Joi.string().required()
});

const autoSuggestSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .max(30),
    limit: Joi.number()
        .positive()
});

export const getUsersQueryValidator = validator.query(autoSuggestSchema);
export const userModelValidator = validator.body(userModelSchema);
export const userIdParamValidator = validator.params(userIdParamsSchema);
