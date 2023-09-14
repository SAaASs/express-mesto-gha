const userRouter = require("express").Router(); // создали роутер
const { cardValidator } = require("../middlewares/errHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
} = require("../controllers/users");

userRouter.get("/", cardValidator, getAllUsers);
userRouter.get("/:userId", cardValidator, getUserById);
userRouter.patch("/me", cardValidator, patchUserInfo);
userRouter.patch("/me/avatar", cardValidator, patchUserAvatar);
module.exports = { userRouter };
