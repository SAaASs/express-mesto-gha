const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('events').EventEmitter.defaultMaxListeners = 20;
const { userRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');

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
app.use('/users/', userRouter);
app.use('/cards/', cardsRouter);
app.use('*', (req, res) => { res.status(404).send({ message: 'Выбранного пути не существует' }); });
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
