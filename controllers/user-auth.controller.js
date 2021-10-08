const User = require('../dataBase/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOneAndUpdate({email, password}, {auth: true});

            res.json(user);
        } catch (e) {
            res(e);
        }
    }
};

