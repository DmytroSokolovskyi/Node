const {User, Cars} = require('../dataBase');
const {passwordService, emailService} = require('../service');
const {userUtil} = require('../util');
const {errorsEnum, statusEnum} = require('../configs');
const {emailActionEnum} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

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
            const {user_id} = req.params;
            const {email, name} = req.userById;
            await User.findByIdAndDelete(user_id);

            await emailService.sendMail(email, emailActionEnum.GOODBYE, {userName: name});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, email, name} = req.body;
            const hashedPassword = await passwordService.hash(password);
            let newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(email, emailActionEnum.WELCOME, {userName: name});

            newUser = userUtil.userNormalizator(newUser.toObject());

            res.status(errorsEnum.CREATED.status).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body, {new: true});

            await emailService.sendMail(user.email, emailActionEnum.UPDATE, {userName: user.name});

            res.status(errorsEnum.CREATED.status).json(user);
        } catch (e) {
            next(e);
        }
    },

    newCarToUser: async (req, res, next) => {
        try {
            const {_id, email, name} = req.userById;
            const newCar = await Cars.create(req.body);
            const userWithCar = await User.findByIdAndUpdate(_id, { $push: {cars: newCar} }, {new: true});

            await emailService.sendMail(email, emailActionEnum.NEW_CAR, {userName: name, car: newCar});

            res.status(errorsEnum.CREATED.status).json(userWithCar);
        } catch (e) {
            next(e);
        }
    },
};
