const {customErrors} = require('../errors');
const {mainValidator} = require('../validators');

module.exports ={
    checkOne: (tableName, field) => async (req, res, next) => {
        try {
            const user = await tableName.findOne({[field]: req.body[field]});

            if (user) {
                return next(customErrors.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getOne: (tableName, field) => async (req, res, next) => {
        try {
            const user = await tableName.findOne({[field]: req.body[field] || req.params[field] });

            if (!user) {
                return next(customErrors.CONFLICT);
            }

            req.one = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    getOneById: (tableName, field) => async (req, res, next) => {
        try {
            const id = req.params[field];
            const user = await tableName.findById(id);

            if (!user) {
                return next(customErrors.NOT_FOUND_ID);
            }

            req.oneById = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkOneById: (tableName, field) => async (req, res, next) => {
        try {
            const id = req.params[field];
            const user = await tableName.findById(id);

            if (user) {
                return next(customErrors.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateBody: (validator) => async (req, res, next) => {
        try {
            const {error, value} = await validator.validate(req.body);

            if (error) {
                return next({message: error.details[0].message});
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateId: (field) => async (req, res, next) => {
        try {
            const idToValidate = req.params[field];
            const {error} = await mainValidator.idValidator.validate({id: idToValidate});

            if (error) {
                return next({message: error.details[0].message});
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
