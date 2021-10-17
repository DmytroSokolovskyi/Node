const jwt = require('jsonwebtoken');

const {errorsEnum, config, tokenEnum} = require('../configs');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign({},config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return { access_token, refresh_token };
    },

    verifyToken: async (token, tokenType) => {
        try {
            const secret = tokenType === tokenEnum.ACCESS ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);

        } catch (e) {
            throw new ErrorHandler(errorsEnum.UNAUTHORIZED);
        }
    }
};
