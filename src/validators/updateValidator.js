import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const updateValidator = createValidator({ passError: true });

export default [
    updateValidator.body(
        Joi.object().keys({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            dueDate: Joi.number().min(new Date().getTime()).optional(),
        })
    ),
    updateValidator.params(
        Joi.object().keys({
            id: Joi.string().regex(/^[a-zA-Z0-9]{24}$/).required(),
        }),
    ),
    updateValidator.headers(
        Joi.object().keys({
            "content-type": Joi.string().valid('application/json').required(),
        }).unknown(),
    )
]