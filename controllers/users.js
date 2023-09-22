const Mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user == null) {
        let er = new Error("Ошибка, пользователь не найден");
        er.statusCode = 404;
        next(er);
        return;
      } else {
        res.send(user);
        return;
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        err.statusCode = 404;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!validator.isEmail(email)) {
    let er = new Error("Неправильная почта или пароль");
    er.statusCode = 401;
    next(er);
    return;
  }
  User.findOne({ email: email }).then((data) => {
    if (data) {
      const er = new Error("Пользователь с таким email уже существует");
      er.statusCode = 409;
      next(er);
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create(
            [
              {
                email: email,
                password: hash,
                name: name,
                about: about,
                avatar: avatar,
              },
            ],
            {
              runValidators: true,
            }
          ).then((user) => {
            res.send({
              _id: user[0]._id,
              name: user[0].name,
              about: user[0].about,
              avatar: user[0].avatar,
              email: user[0].email,
            });
          });
        })
        .catch((err) => {
          if (err.name == "ValidationError") {
            err.statusCode = 403;
            next(err);
            return;
          }
          err.statusCode = 500;
          next(err);
        });
    }
  });
};
module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const updMaterial = {};
  if (name !== undefined) {
    updMaterial.name = name;
  }
  if (about !== undefined) {
    updMaterial.about = about;
  }
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true, new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        err.statusCode = 403;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};
module.exports.patchUserAvatar = (req, res, next) => {
  const updMaterial = {
    avatar: req.body.avatar,
  };
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true, new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        err.statusCode = 403;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};
// controllers/users.js

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" } // токен будет просрочен через час после создания
      );
      res.cookie("mestoAuthCookie", token, { httpOnly: true });
      res.send("test");
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
    });
};
