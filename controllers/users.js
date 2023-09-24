const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const ForbidenError = require('../errors/ForbidenError');
const UnauthorisedError = require('../errors/UnauthorisedError');
const UnkownError = require('../errors/UnknownError');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      next(new UnkownError(err.message));
    });
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user == null) {
        next(new NotFoundError('Ошибка, пользователь не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        next(new NotFoundError(err.message));
        return;
      }
      next(new UnkownError(err.message));
    });
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email }).then((data) => {
    if (data) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create(
            [
              {
                email,
                password: hash,
                name,
                about,
                avatar,
              },
            ],
            {
              runValidators: true,
            },
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
          if (err.name === 'ValidationError') {
            next(new ForbidenError(err.message));
            return;
          }
          next(new UnkownError(err.message));
        });
    }
  });
};
module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const updMaterial = {};
  updMaterial.name = name;
  updMaterial.about = about;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, updMaterial, { runValidators: true, new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ForbidenError(err.message));
        return;
      }
      next(new UnkownError(err.message));
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
      if (err.name === 'ValidationError') {
        next(new ForbidenError(err.message));
        return;
      }
      next(new UnkownError(err.message));
    });
};
// controllers/users.js

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.cookie('mestoAuthCookie', token, { httpOnly: true });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      next(new UnauthorisedError(err.message));
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send(user);
  });
};
