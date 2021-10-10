const User = require('../dataBase/User');
const {userValidator} = require('../validators');

module.exports = {
    createUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.user = value;

            next();
        } catch (e) {
            res.json(e.message);
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
                    throw new Error('The password in one case');
                }
            };
            checkCase(toCheck);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const mail = req.body.email;
            const userByEmail = await User.findOne({email: mail}).lean();

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {error, value} = userValidator.idUserValidator.validate({id: user_id});

            if (error) {
                throw new Error(error.details[0].message);
            }

            const user = await User.findById(value.id).lean();

            if (!user) {
                throw new Error('Id does not exist');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserBodyValid: (req, res, next) => {
        try {
            const { email, password, auth, role } = req.body;

            if ( email || password || auth ||role ) {
                throw new Error('You can only change the name');
            }

            const {error, value} = userValidator.nameEditValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.user = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
