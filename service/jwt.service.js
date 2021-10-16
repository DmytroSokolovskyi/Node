const jwt = require('jsonwebtoken');

const {errorsEnum, config, tokenTypeEnum} = require('../configs');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign({},config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return { access_token, refresh_token };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);

        } catch (e) {
            throw new ErrorHandler(errorsEnum.UNAUTHORIZED);
        }
    }
};
