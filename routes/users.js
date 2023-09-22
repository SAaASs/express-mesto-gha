const userRouter = require("express").Router(); // создали роутер
const { patchUserValidator } = require("../middlewares/errHandler");
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  patchUserInfo,
  patchUserAvatar,
} = require("../controllers/users");

userRouter.get("/", getAllUsers);
userRouter.get("/me", getCurrentUser);
userRouter.get("/:userId", getUserById);

userRouter.patch("/me", patchUserValidator, patchUserInfo);
userRouter.patch("/me/avatar", patchUserValidator, patchUserAvatar);
module.exports = { userRouter };
