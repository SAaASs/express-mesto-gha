const userRouter = require('express').Router(); // создали роутер
const {
  getAllUsers, getUserById, createUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', patchUserInfo);
userRouter.patch('/me/avatar', patchUserAvatar);
module.exports = { userRouter };