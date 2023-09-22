const Mongoose = require("mongoose");
const Card = require("../models/card");

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card == null) {
        let er = new Error("Карточки с таким id не существует");
        er.statusCode = 404;
        next(er);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        err.statusCode = 400;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card == null) {
        let er = new Error("Карточки с таким id не существует");
        er.statusCode = 404;
        next(er);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof Mongoose.CastError) {
        err.statusCode = 400;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};

module.exports.getAllCards = (req, res, next) => {
  console.log("req.user", req.user);
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const sees = req.params.cardId;
  const currentUser = req.user._id;
  Card.findById(sees).then((card) => {
    if (card != null) {
      if (card.owner == currentUser) {
        Card.findByIdAndRemove(sees)
          .then((card) => {
            res.send(card);
          })
          .catch((err) => {
            err.statusCode = 500;
            next(err);
          });
      } else {
        let er = new Error("Это не ваща карточка, вы не можете ее удалить");
        er.statusCode = 400;
        next(er);
      }
    } else {
      let er = new Error("Карточки с такми id не существует");
      er.statusCode = 404;
      next(er);
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
      if (err.name == "ValidationError") {
        err.statusCode = 400;
        next(err);
        return;
      }
      err.statusCode = 500;
      next(err);
    });
};
