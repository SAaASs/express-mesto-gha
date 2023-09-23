const Mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbidenError = require('../errors/ForbidenError');
const UnkownError = require('../errors/UnknownError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card == null) {
        next(new NotFoundError('Карточки с таким id не существует'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        next(new BadRequestError(err.message));
        return;
      }
      next(new UnkownError(err.message));
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card == null) {
        next(new NotFoundError('Карточки с таким id не существует'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        next(new BadRequestError(err.message));
        return;
      }
      next(new UnkownError(err.message));
    });
};

module.exports.getAllCards = (req, res, next) => {
  console.log('req.user', req.user);
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(new UnkownError(err.message));
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const sees = req.params.cardId;
  const currentUser = req.user._id;
  Card.findById(sees).then((card) => {
    if (card != null) {
      if (card.owner === currentUser) {
        Card.findByIdAndRemove(sees)
          .then((card) => {
            res.send(card);
          })
          .catch((err) => {
            next(new UnkownError(err.message));
          });
      } else {
        next(
          new ForbidenError('Это не ваща карточка, вы не можете ее удалить'),
        );
      }
    } else {
      next(new NotFoundError('Карточки с такми id не существует'));
    }
  });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create([{ name, link, owner }], { runValidators: true })
    .then((card) => {
      res.send(card[0]);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ForbidenError(err.message));
        return;
      }
      next(new UnkownError(err.message));
    });
};
