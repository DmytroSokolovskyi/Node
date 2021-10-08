const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userMiddleware.checkPassword, userController.createUser);

router.get('/:user_id', userController.getUserById);
router.put('/:user_id', userController.updateUserById);
router.delete('/:user_id', userController.deleteUserById);

module.exports = router;
