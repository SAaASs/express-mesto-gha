const Mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка${err}` })
    );
};
module.exports.getUserById = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => {
      if (user == null) {
        res.status(404).send({ message: "Ошибка, пользователь не найден" });
        return;
      } else {
        res.send(user);
        return;
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        const er = new Error(err);
        console.log(er);
        res.status(400).send({ message: er.message });
        return;
      }
      res.status(500).send("Непредвиденная ошибка сервера");
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).send({ message: "Неправильная почта" });
    return;
  }
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
      );
    })
    .then((user) => {
      res.send({
        _id: user[0]._id,
        name: user[0].name,
        about: user[0].about,
        avatar: user[0].avatar,
        email: user[0].email,
      });
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(400).send(err);
        return;
      }
      res.status(500).send(err);
    });
};
module.exports.patchUserInfo = (req, res) => {
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
        res.status(400).send(err);
        return;
      }
      res.status(500).send(err);
    });
};
module.exports.patchUserAvatar = (req, res) => {
  const updMaterial = {
    avatar: req.body.avatar,
  };
  const owner = req.user._id;
  console.log(owner);
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true, new: true })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(400).send(err);
        return;
      }
      res.status(500).send(err);
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
      // ошибка аутентификации
      res.status(401).send({ message: err.message });
    });
};
