import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({});

const bodySchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

export const userLoginValidator = validator.body(bodySchema);
