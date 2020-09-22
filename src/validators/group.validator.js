import Joi from 'joi';

const bodySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        .required()
});

const paramsSchema  = Joi.object({
    id: Joi.string()
        .required()
});

export { bodySchema, paramsSchema };
