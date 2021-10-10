const userAuthRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware} = require('../middlewares');

userAuthRouter.post(
    '/login',
    userAuthMiddleware.authBodyValid,
    userAuthMiddleware.userAuth,
    userAuthMiddleware.checkAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);

module.exports = userAuthRouter;
