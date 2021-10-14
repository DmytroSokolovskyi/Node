const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const {errorsEnum} = require('../configs');

module.exports = {
    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {error, value} = userValidator.idUserValidator.validate({id: user_id});

            if (error) {
                return next({message: error.details[0].message, code: errorsEnum.BAD_REQUEST.code});
            }

            const user = await User.findById(value.id).lean();

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
