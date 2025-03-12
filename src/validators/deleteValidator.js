import { createValidator } from "express-joi-validation";
import Joi from "joi";

const validator = createValidator({ passError: true });

export default [
    validator.params(
        Joi.object().keys({
            id: Joi.string().hex().length(24).required()
    }),
    ),
]