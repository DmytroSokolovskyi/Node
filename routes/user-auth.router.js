const userAuthRouter = require('express').Router();

const {userAuthController} = require('../controllers');
const {userAuthMiddleware, mainMiddleware} = require('../middlewares');
const {userAuthValidator} = require('../validators');
const {User} = require('../dataBase');

userAuthRouter.post(
    '/login',
    mainMiddleware.validateBody(userAuthValidator.loginValidator),
    userAuthMiddleware.userAuth,
    userAuthMiddleware.comparePassword,
    userAuthController.loginUser
);
userAuthRouter.post(
    '/logout',
    mainMiddleware.validateBody(userAuthValidator.logoutValidator),
    mainMiddleware.findAndCheckOne(User, 'email'),
    userAuthController.logoutUser);

module.exports = userAuthRouter;
