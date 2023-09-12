const Mongoose = require("mongoose");
const Card = require("../models/card");

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card == null) {
        const er = new Error(card);
        res.status(404).send({ message: er.message });
      } else {
        res.send(card);
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

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card == null) {
        const er = new Error(card);
        res.status(404).send({ message: er.message });
      } else {
        res.send(card);
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

module.exports.getAllCards = (req, res) => {
  console.log("req.user", req.user);
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка${err}` })
    );
};

module.exports.deleteCardById = (req, res) => {
  const sees = req.params.cardId;
  const currentUser = req.user._id;
  console.log("sees", sees);
  Card.findById(sees).then((card) => {
    if (card != null) {
      if (card.owner == currentUser) {
        Card.findByIdAndRemove(sees)
          .then((card) => {
            res.send(card);
          })
          .catch((err) => {
            console.log(err);
            if (err.name == "CastError") {
              res.status(400).send(err);
              return;
            }
            res.status(500).send(err);
          });
      }
    } else {
      const er = new Error(card);
      res.status(404).send({ message: "Карточки с такми id не существует" });
    }
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create([{ name, link, owner }], { runValidators: true })
    .then((card) => {
      res.send(card[0]);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(400).send(err);
        return;
      }
      res.status(500).send(err);
    });
};
