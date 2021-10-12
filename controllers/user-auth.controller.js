const User = require('../dataBase/User');
const {userUtil} = require('../util');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email} = req.body;
            let userNew = await User.findOneAndUpdate({email}, {auth: true}).lean();

            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const {email} = req.body;
            let userNew = await User.findOneAndUpdate({email}, {auth: false}).lean();

            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            next(e);
        }
    }
};

