const bcrypt = require('bcrypt');

const {ErrorHandler} = require('../errors');

module.exports = {
    hash: async (password) => {
        const passwordSalt = await bcrypt.hash(password, 10);

        return passwordSalt;
    },
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler('Wrong email or password', 404);
        }

        return true;
    }
};
