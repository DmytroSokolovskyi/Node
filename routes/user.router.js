const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get('/', userController.getUsers);
router.post(
    '/',
    userMiddleware.createUserBodyValid,
    userMiddleware.checkPasswordCase,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.put(
    '/:user_id',
    userMiddleware.updateUserBodyValid,
    userMiddleware.checkUserIdMiddleware,
    userController.updateUserById
);
router.get('/:user_id', userMiddleware.checkUserIdMiddleware, userController.getUserById);
router.delete('/:user_id', userMiddleware.checkUserIdMiddleware, userController.deleteUserById);

module.exports = router;
