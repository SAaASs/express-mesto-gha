const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('events').EventEmitter.defaultMaxListeners = 20;
const {
  createUserRouter, getAllUsersRouter, getUserByIdRouter, patchUserInfoRouter, patchUserAvatarRouter,
} = require('./routes/users');
const {
  createCardRouter, getAllCardsRouter, deleteCardByIdRouter, likeCardRouter, unlikeCardRouter,
} = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '64e8d2cef0053b4225568dcf',
  };

  next();
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use('/', createUserRouter);
app.use('/', getAllUsersRouter);
app.use('/', getUserByIdRouter);
app.use('/', patchUserInfoRouter);
app.use('/', patchUserAvatarRouter);
app.use('/', createCardRouter);
app.use('/', getAllCardsRouter);
app.use('/', deleteCardByIdRouter);
app.use('/', likeCardRouter);
app.use('/', unlikeCardRouter);
app.listen(PORT, () => {
});
