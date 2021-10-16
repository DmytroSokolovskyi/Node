
const Joi = require('joi');

const {carsModelEnum} = require('../configs');

const bodyCarValidator = Joi.object({
    model: Joi
        .string()
        .allow(...Object.values(carsModelEnum))
        .required(),
    year: Joi
        .number()
        .min(1900)
        .max(2021)
        .required(),
    price: Joi
        .string()
        .required()
        .trim()
});

module.exports ={
    bodyCarValidator
};
