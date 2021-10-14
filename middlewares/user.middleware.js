const {Clients} = require('../dataBase');
const {userValidator} = require('../validators');
const {customErrors} = require('../errors');

module.exports = {
    createUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next(customErrors.BAD_REQUEST);
            }

            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordCase: (req, res, next) => {
        try {
            const {password} = req.body;
            const toCheck = password.split('');

            const checkCase = (pass) => {
                let upper = 0;
                let lover = 0;
                pass.forEach(p => p !== p.toLowerCase() ? upper++ : lover++);

                if (!upper || !lover) {
                    return next({message: 'The password in one case', status: 400});
                }
            };
            checkCase(toCheck);

            next();
        } catch (e) {
            next(e);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const mail = req.body.email;
            const userByEmail = await Clients.findOne({email: mail}).lean();

            if (userByEmail) {
                return next(customErrors.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {error, value} = userValidator.idUserValidator.validate({id: user_id});

            if (error) {
                return next(customErrors.BAD_REQUEST);
            }

            const user = await Clients.findById(value.id).lean();

            if (!user) {
                return next(customErrors.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserBodyValid: (req, res, next) => {
        try {
            const { email, password, auth, role } = req.body;

            if ( email || password || auth ||role ) {
                return next(customErrors.FORBIDDEN);
            }

            const {error, value} = userValidator.nameEditValidator.validate(req.body);

            if (error) {
                return next(customErrors.BAD_REQUEST);
            }

            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
