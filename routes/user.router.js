const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, mainMiddleware, userAuthMiddleware } = require('../middlewares');
const { userValidator, carValidator } = require('../validators');
const { User, O_Auth } = require('../dataBase');
const { userRolesEnum, tokenEnum } = require('../configs');

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
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.checkRole([
        userRolesEnum.ADMIN,
        userRolesEnum.MANAGER
    ]),
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
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    mainMiddleware.checkRole([
        userRolesEnum.ADMIN,
        userRolesEnum.USER
    ]),
    userController.deleteUserById
);
router.put(
    '/car/:user_id',
    mainMiddleware.validateBody(carValidator.bodyCarValidator),
    userMiddleware.checkUserIdMiddleware,
    userAuthMiddleware.checkToken(O_Auth, tokenEnum.ACCESS),
    userController.newCarToUser
);

module.exports = router;
