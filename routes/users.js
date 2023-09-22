const userRouter = require("express").Router(); // создали роутер
const {
  patchUserValidator,
  getUserValidator,
} = require("../middlewares/errHandler");
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  patchUserInfo,
  patchUserAvatar,
} = require("../controllers/users");

userRouter.get("/", getAllUsers);
userRouter.get("/me", getCurrentUser);
userRouter.get("/:userId", getUserValidator, getUserById);

userRouter.patch("/me", patchUserValidator, patchUserInfo);
userRouter.patch("/me/avatar", patchUserValidator, patchUserAvatar);
module.exports = { userRouter };
