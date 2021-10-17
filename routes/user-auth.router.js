const userAuthRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware, mainMiddleware} = require('../middlewares');
const {userAuthValidator} = require('../validators');
const {tokenEnum} = require('../configs');

userAuthRouter.post(
    '/login',
    mainMiddleware.validateBody(userAuthValidator.loginValidator),
    userAuthMiddleware.userAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);
userAuthRouter.get(
    '/logout',
    userAuthMiddleware.checkToken(tokenEnum.ACCESS),
    userAuthController.logoutUser
);
userAuthRouter.get(
    '/logoutall',
    userAuthMiddleware.checkToken(tokenEnum.ACCESS),
    userAuthController.logoutAll
);
userAuthRouter.get(
    '/refresh',
    userAuthMiddleware.checkToken(tokenEnum.REFRESH),
    userAuthController.changeRefresh
);

module.exports = userAuthRouter;
