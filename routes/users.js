const userRouter = require("express").Router(); // создали роутер
const { userValidator } = require("../middlewares/errHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
} = require("../controllers/users");

userRouter.get("/", userValidator, getAllUsers);
userRouter.get("/:userId", userValidator, getUserById);
userRouter.patch("/me", userValidator, patchUserInfo);
userRouter.patch("/me/avatar", userValidator, patchUserAvatar);
module.exports = { userRouter };
