const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            res.json({user});
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const delUser = await User.findByIdAndDelete(user_id);

            res.json(delUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },
};
