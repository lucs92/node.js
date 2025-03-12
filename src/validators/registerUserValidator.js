import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const validator = createValidator({ passError: true });

export default [
    validator.body(
        Joi.object().keys({
            email: Joi.string().required().email({tlds: {allow: false}}),
            password: Joi.string().required()
        })
    )
];