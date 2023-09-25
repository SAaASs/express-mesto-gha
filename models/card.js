const mongoose = require('mongoose');
// создадим схему документа «Домашнее животное»
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    likes: [
      {
        // описываем схему для одного элемента и заключаем её в квадратные скобки
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    link: {
      type: String,
      required: true,
      validate:
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('Card', cardSchema);
