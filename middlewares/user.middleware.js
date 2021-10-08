const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkPassword: (req, res, next) => {
        try {
            const {password} = req.body;
            const toCheck = password.split('');

            const checkCase = (pass) => {
                let upper = 0;
                let lover = 0;
                pass.forEach(p => p !== p.toLowerCase() ? upper++ : lover++);

                if (upper === 0 || lover === 0) {
                    throw new Error('The password password in one case');
                }

            };
            checkCase(toCheck);

            if (password.length < 10 || password.length > 30) {
                throw new Error('The password cannot be beat that long');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
