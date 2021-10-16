const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, mainMiddleware, userAuthMiddleware} = require('../middlewares');
const {userValidator, carValidator} = require('../validators');
const {User} = require('../dataBase');

router.get('/', userController.getUsers);
router.post(
    '/',
    mainMiddleware.validateBody(userValidator.createUserValidator),
    mainMiddleware.checkOne(User, 'email'),
    userController.createUser
);
router.put(
    '/:user_id',
    mainMiddleware.validateBody(userValidator.nameEditValidator),
    userMiddleware.checkUserIdMiddleware,
    userController.updateUserById
);
router.get(
    '/:user_id',
    userMiddleware.checkUserIdMiddleware,
    userController.getUserById
);
router.delete(
    '/:user_id',
    userMiddleware.checkUserIdMiddleware,
    userController.deleteUserById
);
router.put(
    '/car',
    mainMiddleware.validateBody(carValidator.bodyCarValidator),
    userAuthMiddleware.checkAccessToken,
    userController.newCarToUser
);

module.exports = router;
