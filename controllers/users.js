const Mongoose = require("mongoose");
const User = require("../models/user");

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
      }
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create([{ name, about, avatar }], { runValidators: true })
    .then((user) => {
      res.send({
        _id: user[0]._id,
        name: user[0].name,
        about: user[0].about,
        avatar: user[0].avatar,
      });
    })
    .catch((err) => {
      if (err.errors.name.name == "ValidatorError") {
        res.status(400).send({ message: err });
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
    .catch((err) =>
      res.status(400).send({ message: `Произошла ошибка${err}` })
    );
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
    .catch((err) =>
      res.status(400).send({ message: `Произошла ошибка${err}` })
    );
};
