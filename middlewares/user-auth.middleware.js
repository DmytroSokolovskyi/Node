const User = require('../dataBase/User');

module.exports = {
    userAuth: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email, password});

            if (!user) {
                throw new Error('Wrong Email or password');
            }

            next();
        }catch (e) {
            res.json(e.message);
        }

    },

    checkAuth: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email, password});

            if (user.auth) {
                throw new Error('You are already logged in');
            }

            next();
        }catch (e) {
            res.json(e.message);
        }

    }
};
