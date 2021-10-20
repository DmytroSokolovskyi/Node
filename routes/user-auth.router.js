const userAuthRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware, mainMiddleware} = require('../middlewares');
const {userAuthValidator} = require('../validators');
const {tokenEnum} = require('../configs');
const {User, O_Auth, ActionToken} = require('../dataBase');

userAuthRouter.post(
    '/login',
    mainMiddleware.validateBody(userAuthValidator.loginValidator),
    userAuthMiddleware.userAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);
userAuthRouter.get(
    '/logout',
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    userAuthController.logoutUser
);
userAuthRouter.get(
    '/logoutall',
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    userAuthController.logoutAll
);
userAuthRouter.get(
    '/refresh',
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.REFRESH),
    userAuthController.changeRefresh
);
userAuthRouter.post(
    '/forgot/password',
    mainMiddleware.validateBody(userAuthValidator.emailValidator),
    mainMiddleware.findAndCheckOne(User,'email', false),
    userAuthController.forgotPass
);
userAuthRouter.post(
    '/change/password',
    mainMiddleware.validateBody(userAuthValidator.passwordValidator),
    userAuthMiddleware.checkToken(ActionToken, tokenEnum.ACTION),
    userAuthController.changePass
);

module.exports = userAuthRouter;
