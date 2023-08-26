const getAllUsersRouter = require('express').Router(); // создали роутер
const getUserByIdRouter = require('express').Router(); // создали роутер
const createUserRouter = require('express').Router(); // создали роутер
const patchUserInfoRouter = require('express').Router(); // создали роутер
const patchUserAvatarRouter = require('express').Router(); // создали роутер
const {
  getAllUsers, getUserById, createUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

getAllUsersRouter.get('/users/', getAllUsers);
getUserByIdRouter.get('/users/:userId', getUserById);
createUserRouter.post('/users/', createUser);
patchUserInfoRouter.patch('/users/me', patchUserInfo);
patchUserAvatarRouter.patch('/users/me/avatar', patchUserAvatar);
module.exports = {
  createUserRouter, getAllUsersRouter, getUserByIdRouter, patchUserInfoRouter, patchUserAvatarRouter,
};
