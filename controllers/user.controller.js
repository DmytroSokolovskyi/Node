const {readDb, userById, deleteById, createNewUser, updateUser} = require("../helpers/users.helpers");

module.exports = {
    getUsers: (req, res) => {
        readDb().then(data => res.json(JSON.parse(data)));
    },
    getUserById: (req, res) => {
        const {user_id} = req.params;
        userById(user_id).then(value => res.json(value));
    },
    deleteUserById: (req, res) => {
        const {user_id} = req.params;
        deleteById(user_id).then(value => res.json(value));
    },
    createUser: (req, res) => {
        createNewUser(req.body).then(value => res.json(JSON.parse(value)));
    },
    updateUserById: (req, res) => {
        const {user_id} = req.params;
        updateUser(user_id, req.body).then(value => res.json(JSON.parse(value)));
    },
};