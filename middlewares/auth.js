const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const authorization = req.cookies.mestoAuthCookie;
  console.log(authorization);
  if (!authorization) {
    console.log("1st err");
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    console.log("2nd err");
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  console.log(payload);
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
