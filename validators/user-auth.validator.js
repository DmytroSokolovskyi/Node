const Joi = require('joi');

const {constants} = require('../configs');

const loginValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase()
        .required(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required()
});

module.exports = {
    loginValidator
};
