const Client = require('../dataBase/Clients');
const {userUtil} = require('../util');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email} = req.body;
            let userNew = await Client.findOneAndUpdate({email}, {auth: true}).lean();

            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const {email} = req.body;
            let userNew = await Client.findOneAndUpdate({email}, {auth: false}).lean();

            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            next(e);
        }
    }
};

