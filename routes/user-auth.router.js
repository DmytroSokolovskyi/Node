const userAuthRouter = require('express').Router();

const userAuthController = require('../controllers/user-auth.controller');
const userAuthMiddleware = require('../middlewares/user-auth.middleware');

userAuthRouter.post('/login',userAuthMiddleware.userAuth, userAuthMiddleware.checkAuth, userAuthController.loginUser);

module.exports = userAuthRouter;
