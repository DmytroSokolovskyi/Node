const { User, Cars, O_Auth, ActionToken} = require('../dataBase');
const { emailService, jwtService, userService} = require('../service');
const { errorsEnum, statusEnum, actionTokenTypeEnum, config } = require('../configs');
const { emailActionEnum } = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllusers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.userById;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { email, name } = req.userById;
            await User.deleteOne({ _id : user_id });
            await O_Auth.deleteMany({ user_id });

            await emailService.sendMail(email, emailActionEnum.GOODBYE, { userName: name });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { email, name } = req.body;
            let newUser = await User.createUserWithPassword(req.body);
            newUser = newUser.normalize();

            const activate_token = jwtService.generateActionToken({ email }, actionTokenTypeEnum.ACTIVATE_ACCOUNT);

            await ActionToken.create({
                action_token: activate_token,
                type: actionTokenTypeEnum.ACTIVATE_ACCOUNT,
                user_id: newUser._id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name, URL: `${ config.ACTIVATE_URL }/${ activate_token }` },
            );

            res.status(errorsEnum.CREATED.status).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

            await emailService.sendMail(user.email, emailActionEnum.UPDATE, { userName: user.name });

            res.status(errorsEnum.CREATED.status).json(user);
        } catch (e) {
            next(e);
        }
    },

    newCarToUser: async (req, res, next) => {
        try {
            const { _id, email, name } = req.userById;
            const newCar = await Cars.create(req.body);
            const userWithCar = await User.findByIdAndUpdate(_id, { $push: { cars: newCar } }, { new: true });

            await emailService.sendMail(email, emailActionEnum.NEW_CAR, { userName: name, car: newCar });

            res.status(errorsEnum.CREATED.status).json(userWithCar);
        } catch (e) {
            next(e);
        }
    },
};
