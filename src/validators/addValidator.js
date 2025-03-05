import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const addValidator = createValidator({ passError: true });

export default [
    addValidator.body(
        Joi.object().keys({
            name : Joi.string().required().min(3),
            description: Joi.string().required().min(3),
            dueDate: Joi.number().optional(),
        })
    )
]