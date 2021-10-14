const Joi = require('joi');

const {constants, rolesEnum} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    phone: Joi
        .string()
        .regex(constants.MOBILE_REGEXP)
        .lowercase()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(rolesEnum)),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required(),
});

const idUserValidator = Joi.object({
    id:  Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .regex(constants.ID_REGEXP)
        .required()
});

const nameEditValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator,
    idUserValidator,
    nameEditValidator
};
