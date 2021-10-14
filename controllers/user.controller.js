const Client = require('../dataBase/Clients');
const {passwordService} = require('../service');
const {userUtil} = require('../util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await Client.find();

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
            const delUser = await Client.findByIdAndDelete(user_id);

            res.json(delUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password} = req.user;
            const hashedPassword = await passwordService.hash(password);
            let newUser =await Client.create({...req.user, password: hashedPassword});

            newUser = userUtil.userNormalizator(newUser.toObject());

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await Client.findByIdAndUpdate(user_id, req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
