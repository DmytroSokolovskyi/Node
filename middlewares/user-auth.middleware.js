const User = require('../dataBase/User');
const {passwordService, jwtService} = require('../service');
const {errorsEnum, constants} = require('../configs');
const {O_Auth} = require('../dataBase');

module.exports = {
    userAuth: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await User
                .findOne({ email })
                .select('+password')
                .lean();

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
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
            await passwordService.compare(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken:async (req, res, next) => {
        try {
            console.log("app");
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                return next(errorsEnum.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            const userbyAuth = await O_Auth.findOne({ access_token: token }).populate('user_id');

            if (!userbyAuth) {
                return next(errorsEnum.UNAUTHORIZED);
            }

            console.log(userbyAuth);
            next();
        } catch (e) {
            next(e);
        }
    }
};
