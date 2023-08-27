const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((user) => res.send({ data: user })).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId).then((user) => res.send({ data: user })).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }, { runValidators: true }).then((user) => { res.send({ data: user }); }).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
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
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true }).then((user) => { res.send({ data: user }); }).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};
module.exports.patchUserAvatar = (req, res) => {
  const updMaterial = {
    avatar: req.body.avatar,
  };
  const owner = req.user._id;
  console.log(updMaterial);
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true }).then((user) => { res.send({ data: user }); }).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};
