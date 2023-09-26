const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');

module.exports.auth = (req, res, next) => {
  const authorization = req.cookies.mestoAuthCookie;
  console.log(authorization);
  if (!authorization) {
    console.log('1st err');
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    console.log('2nd err');
    next(new UnauthorisedError('Неправильный логин или пароль'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
