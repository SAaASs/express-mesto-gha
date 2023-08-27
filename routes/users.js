const userRouter = require('express').Router(); // создали роутер
const {
  getAllUsers, getUserById, createUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users/', createUser);
userRouter.patch('/users/me', patchUserInfo);
userRouter.patch('/users/me/avatar', patchUserAvatar);
module.exports = { userRouter };
