const User = require('../dataBase/User');
const {passwordService} = require('../service');
const {userUtil} = require('../util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();
            const usersNormalize = users.map((user) => userUtil.userNormalizator(user));

            res.json(usersNormalize);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            let user = req.user;
            user = userUtil.userNormalizator(user);

            res.json({user});
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            let delUser = await User.findByIdAndDelete(user_id).lean();
            delUser = userUtil.userNormalizator(delUser);

            res.json(delUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {password} = req.user;
            const hashedPassword = await passwordService.hash(password);
            await User.create({...req.user, password: hashedPassword});

            res.json("Done");
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body).lean();
            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },
};
