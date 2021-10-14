const Joi = require('joi');

const {constants} = require('../configs');

const idValidator = Joi.object({
    id:  Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .regex(constants.ID_REGEXP)
        .required()
});

module.exports = {
    idValidator
};
