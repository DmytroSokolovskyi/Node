const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, mainMiddleware, userAuthMiddleware} = require('../middlewares');
const {userValidator, carValidator} = require('../validators');
const {User} = require('../dataBase');
const {userRolesEnum, tokenEnum} = require('../configs');

router.get('/', userController.getUsers);
router.post(
    '/',
    mainMiddleware.validateBody(userValidator.createUserValidator),
    mainMiddleware.checkOne(User, 'email'),
    userController.createUser
);
router.put(
    '/:user_id',
    mainMiddleware.validateBody(userValidator.userEditValidator),
    userMiddleware.checkUserIdMiddleware,
    mainMiddleware.checkOne(User, 'email'),
    userAuthMiddleware.checkToken(tokenEnum.ACCESS),
    mainMiddleware.checkRole(userRolesEnum.ADMIN, userRolesEnum.MANAGER),
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
    userAuthMiddleware.checkToken(tokenEnum.ACCESS),
    mainMiddleware.checkRole(userRolesEnum.ADMIN, userRolesEnum.USER),
    userController.deleteUserById
);
router.post(
    '/car',
    mainMiddleware.validateBody(carValidator.bodyCarValidator),
    userAuthMiddleware.checkToken(tokenEnum.ACCESS),
    userController.newCarToUser
);

module.exports = router;
