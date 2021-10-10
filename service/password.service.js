const bcrypt = require('bcrypt');

module.exports = {
    hash: async (password) => {
        const passwordSalt = await bcrypt.hash(password, 10);

        return passwordSalt;
    },
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }

        return true;
    }
};
