const {userUtil} = require('../util');
const {jwtService} = require('../service');
const {O_Auth, User} = require('../dataBase');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user } = req;
            const tokenPair = jwtService.generateTokenPair();

            userUtil.userNormalizator(user);

            await O_Auth.create({ ...tokenPair, user_id: user._id });

            res.json({ user, ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const { email } = req.body;
            let userNew = await User.findOneAndUpdate({ email }, {auth: false}).lean();

            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            next(e);
        }
    }
};

