const mongoose = require('mongoose');
// создадим схему документа «Домашнее животное»
const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});
module.exports = mongoose.model('User', userSchema);
