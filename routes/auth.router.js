const authRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware} = require('../middlewares');

authRouter.post(
    '/login',
    userAuthMiddleware.loginBodyValid,
    userAuthMiddleware.userAuth,
    userAuthMiddleware.checkAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);
authRouter.post(
    '/logout',
    userAuthMiddleware.logoutBodyValid,
    userAuthMiddleware.userAuth,
    userAuthController.logoutUser);

module.exports = authRouter;
