const {User, Cars} = require('../dataBase');
const {passwordService} = require('../service');
const {userUtil} = require('../util');

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
            const delUser = await User.findByIdAndDelete(user_id);

            res.json(delUser);
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

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    newCarToUser: async (req, res, next) => {
        try {
            const {user_id} = req.user;
            const newCar = await Cars.create(req.body);
            const userWithCar = await User.findByIdAndUpdate(user_id,
                { $push: {cars: newCar}},
                {new : true}
            );

            res.json(userWithCar);
        } catch (e) {
            next(e);
        }
    },
};
