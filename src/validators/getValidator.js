import { createValidator } from "express-joi-validation";
import Joi from "joi";

const getValidator = createValidator({ passError: true });

export default [
    getValidator.params(
        Joi.object().keys({
            id: Joi.string().hex().length(24).required()
    }),
    ),
]