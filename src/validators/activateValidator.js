import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const validator = createValidator({ passError: true });

export default [
    validator.params(
        Joi.object().keys({
            "token": Joi.string().length(10).required(),
        }),
    ),
]