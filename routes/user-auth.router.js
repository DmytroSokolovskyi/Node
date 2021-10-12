const userAuthRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware} = require('../middlewares');

userAuthRouter.post(
    '/login',
    userAuthMiddleware.loginBodyValid,
    userAuthMiddleware.userAuth,
    userAuthMiddleware.checkAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);
userAuthRouter.post(
    '/logout',
    userAuthMiddleware.logoutBodyValid,
    userAuthMiddleware.userAuth,
    userAuthController.logoutUser);

module.exports = userAuthRouter;
