const Mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => { res.send(card); }).catch((err) => { if (err instanceof Mongoose.CastError) { const er = new Error(err); console.log(er); res.status(400).send({ message: er.message }); } });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => { res.send(card); }).catch((err) => { if (err instanceof Mongoose.CastError) { const er = new Error(err); console.log(er); res.status(400).send({ message: er.message }); } });
};

module.exports.getAllCards = (req, res) => {
  Card.find({}).then((card) => res.send({ data: card })).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};

module.exports.deleteCardById = (req, res) => {
  const sees = req.params.cardId;
  Card.findByIdAndRemove(sees).then((card) => res.send({ data: card })).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create([{ name, link, owner }], { runValidators: true }).then((card) => { res.send(card[0]); }).catch((err) => res.status(400).send({ message: `Произошла ошибка${err}` }));
};
