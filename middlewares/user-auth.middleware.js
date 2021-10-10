const User = require('../dataBase/User');
const {passwordService} = require('../service');
const {userAuthValidator} = require('../validators');

module.exports = {
    authBodyValid: (req, res, next) => {
        try {
            const {error, value} = userAuthValidator.authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.emailPass = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    userAuth: async (req, res, next) => {
        try {
            const {email} = req.emailPass;
            const user = await User.findOne({email});

            if (!user) {
                throw new Error('Wrong Email or password');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkAuth: (req, res, next) => {
        try {
            const {user} = req;

            if (user.auth) {
                throw new Error('You are already logged in');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    comparePassword:async (req, res, next) => {
        try {
            const {password} = req.body;
            const user = req.user;
            const check = await passwordService.compare(password, user.password);

            if (!check) {
                throw new Error('Wrong Email or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
