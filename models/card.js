const mongoose = require('mongoose');
// создадим схему документа «Домашнее животное»
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{ // описываем схему для одного элемента и заключаем её в квадратные скобки
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: [],
  }],
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Card', cardSchema);
