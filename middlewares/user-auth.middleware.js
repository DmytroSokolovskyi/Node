const User = require('../dataBase/User');
const {passwordService} = require('../service');
const {errorsEnum} = require('../configs');

module.exports = {
    userAuth: async (req, res, next) => {

        try {
            const {email} = req.body;
            const user = await User.findOne({email}).select('+password');

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            if (user.auth) {
                return next(errorsEnum.OK);
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
    }
};
