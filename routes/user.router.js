const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userMiddleware.checkPassword, userController.createUser);

router.get('/:user_id', userMiddleware.checkUserIdMiddleware, userController.getUserById);
router.put('/:user_id', userMiddleware.checkUserIdMiddleware, userController.updateUserById);
router.delete('/:user_id', userMiddleware.checkUserIdMiddleware, userController.deleteUserById);

module.exports = router;
