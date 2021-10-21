const userAuthRouter = require('express').Router();

const { userAuthController } = require('../controllers');
const { userAuthMiddleware, mainMiddleware } = require('../middlewares');
const { userAuthValidator } = require('../validators');
const { tokenEnum, actionTokenTypeEnum } = require('../configs');
const { User, O_Auth, ActionToken } = require('../dataBase');

userAuthRouter.post(
    '/login',
    mainMiddleware.validateBody(userAuthValidator.loginValidator),
    userAuthMiddleware.userAuth,
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
userAuthRouter.put(
    '/password',
    mainMiddleware.validateBody(userAuthValidator.changePasswordValidator),
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    userAuthController.changePass
);
userAuthRouter.get(
    '/activate/:token',
    userAuthMiddleware.checkToken(ActionToken, actionTokenTypeEnum.ACTIVATE_ACCOUNT),
    userAuthController.activateAccount
);
userAuthRouter.post(
    '/password/forgot',
    mainMiddleware.validateBody(userAuthValidator.emailValidator),
    mainMiddleware.findAndCheckOne(User,'email', false),
    userAuthController.forgotPass
);
userAuthRouter.put(
    '/password/forgot',
    mainMiddleware.validateBody(userAuthValidator.passwordValidator),
    userAuthMiddleware.checkToken(ActionToken, actionTokenTypeEnum.FORGOT_PASSWORD),
    userAuthController.setNewPass
);

module.exports = userAuthRouter;
