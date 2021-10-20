const {userUtil} = require('../util');
const {jwtService, emailService, passwordService} = require('../service');
const {O_Auth, ActionToken, User} = require('../dataBase');
const {statusEnum, tokenEnum, emailActionEnum} = require('../configs');

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
            const { token } = req;

            await O_Auth.remove({ [tokenEnum.ACCESS]: token} );

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({ user_id: _id });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    changeRefresh: async (req, res, next) => {
        try {
            const { token } = req;
            const tokenPair = jwtService.generateTokenPair();
            const newPair = await O_Auth.findOneAndUpdate(
                { [tokenEnum.REFRESH]: token },
                { ...tokenPair },
                { new: true }
            );

            res.json(newPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPass: async (req, res, next) => {
        try {
            const { _id, email, name } = req.one;
            const actionToken = jwtService.generateActionToken(email);
            await ActionToken.create({ action_token: actionToken, type: tokenEnum.ACTION, user_id: _id });

            await emailService.sendMail(email, emailActionEnum.FORGOT_PASS, { userName: name, token: actionToken });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    changePass: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;
            const { password } = req.body;
            const hashedPassword = await passwordService.hash(password);
            await User.findByIdAndUpdate( _id , { password: hashedPassword });
            await O_Auth.deleteMany({ user_id: _id });
            await ActionToken.deleteMany({ user_id: _id });

            await emailService.sendMail(email, emailActionEnum.CHANGE_PASS, { userName: name });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};
