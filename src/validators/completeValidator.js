import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const validator = createValidator({ passError: true});

export default [
    validator.params(
            Joi.object().keys({
                id: Joi.string().regex(/^[a-zA-Z0-9]{24}$/).required(),
            }),
        ),
]