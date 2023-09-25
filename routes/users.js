const userRouter = require('express').Router(); // создали роутер
const {
  patchProfileValidator,
  patchAvatarValidator,
  getUserValidator,
} = require('../middlewares/errHandler');
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', getUserValidator, getUserById);

userRouter.patch('/me', patchProfileValidator, patchUserInfo);
userRouter.patch('/me/avatar', patchAvatarValidator, patchUserAvatar);
module.exports = { userRouter };
