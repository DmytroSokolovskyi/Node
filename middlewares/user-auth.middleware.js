const User = require('../dataBase/User');
const {passwordService} = require('../service');
const {userAuthValidator} = require('../validators');

module.exports = {
    loginBodyValid: (req, res, next) => {
        try {
            const {error, value} = userAuthValidator.loginValidator.validate(req.body);

            if (error) {
                return next({message: error.details[0].message, status: 400});
            }

            req.emailPass = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    logoutBodyValid: (req, res, next) => {
        try {
            const {error, value} = userAuthValidator.logoutValidator.validate(req.body);

            if (error) {
                return next({message: error.details[0].message, status: 400});
            }

            req.emailPass = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    userAuth: async (req, res, next) => {
        try {
            const {email} = req.emailPass;
            const user = await User.findOne({email}).select('+password');

            if (!user) {
                return next({message: 'Wrong Email or password', status: 404});
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAuth: (req, res, next) => {
        try {
            const {user} = req;

            if (user.auth) {
                return next({message: 'You are already logged in', status: 200});
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    comparePassword:async (req, res, next) => {
        try {
            const {password} = req.body;
            const user = req.user;
            const check = await passwordService.compare(password, user.password);

            if (!check) {
                return next({message: 'Wrong Email or password', status: 404});
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
