const {User, Cars} = require('../dataBase');
const {passwordService} = require('../service');
const {userUtil} = require('../util');
const {errorsEnum, statusEnum} = require('../configs');

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
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            await User.findByIdAndDelete(user_id);

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashedPassword = await passwordService.hash(password);
            let newUser = await User.create({...req.body, password: hashedPassword});

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

            res.status(errorsEnum.CREATED.status).json(user);
        } catch (e) {
            next(e);
        }
    },

    newCarToUser: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const newCar = await Cars.create(req.body);
            const userWithCar = await User.findByIdAndUpdate(_id, { $push: {cars: newCar} }, {new: true});

            res.status(errorsEnum.CREATED.status).json(userWithCar);
        } catch (e) {
            next(e);
        }
    },
};
