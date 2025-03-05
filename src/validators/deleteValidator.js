import { createValidator } from "express-joi-validation";
import Joi from "joi";

const deleteValidator = createValidator({ passError: true });

export default [
    deleteValidator.params(
        Joi.object().keys({
            id: Joi.string().hex().length(24).required()
    }),
    ),
]