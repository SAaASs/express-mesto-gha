const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
require('events').EventEmitter.defaultMaxListeners = 20;
const { createUser, login } = require('./controllers/users');
const {
  createUserValidator,
  loginUserValidator,
} = require('./middlewares/errHandler');
const { auth } = require('./middlewares/auth');
const { userRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const { errHandler } = require('./middlewares/errHandler');
const cookieParser = require('cookie-parser');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());
app.post('/signin', loginUserValidator, login);
app.post('/signup', createUserValidator, createUser);
app.use(auth);

app.use('/users/', userRouter);
app.use('/cards/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Выбранного пути не существует' });
});
app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(96);
  console.log(`App listening on port ${PORT}`);
});
