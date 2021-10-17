const {userUtil} = require('../util');
const {jwtService} = require('../service');
const {O_Auth} = require('../dataBase');
const {statusEnum, tokenEnum} = require('../configs');

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
            const { _id } = req.user;

            await O_Auth.remove({user_id: _id});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    changeRefresh: async (req, res, next) => {
        try {
            const { user, token } = req;
            const tokenPair = jwtService.generateTokenPair();

            userUtil.userNormalizator(user);

            const newPair = await O_Auth.findOneAndUpdate(
                {[tokenEnum.REFRESH]: token},
                {...tokenPair},
                {new: true}
            );

            res.json(newPair);
        } catch (e) {
            next(e);
        }
    }
};
