const userRouter = require("express").Router(); // создали роутер
const { patchUserValidator } = require("../middlewares/errHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
} = require("../controllers/users");

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserById);
userRouter.patch("/me", patchUserValidator, patchUserInfo);
userRouter.patch("/me/avatar", patchUserValidator, patchUserAvatar);
module.exports = { userRouter };
