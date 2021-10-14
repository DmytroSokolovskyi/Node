const Joi = require('joi');

const {constants, rolesEnum} = require('../configs');

const clientValidate = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    surname: Joi
        .string()
        .alphanum()
        .min(5)
        .max(30)
        .trim(),
    phone: Joi
        .string()
        .regex(constants.MOBILE_REGEXP)
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase(),
    role: Joi
        .string()
        .allow(...Object.values(rolesEnum))
});

module.exports = {
    clientValidate,
};
