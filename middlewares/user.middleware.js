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
                for (const one of pass) {
                    if (one !== one.toLowerCase(one)) {
                        upper = upper + 1;
                    } else {
                        lover = lover + 1;
                    }

                }

                if (upper === 0 || lover === 0) {
                    return true;
                }
            };

            if (checkCase(toCheck)) {
                throw new Error('The password password in one case');
            }

            if (password < 10 || password > 30) {
                throw new Error('The password cannot be beat that long');
            }


            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
