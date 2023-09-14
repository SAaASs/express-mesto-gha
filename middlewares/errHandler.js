const { celebrate, Joi } = require("celebrate");
const { default: mongoose } = require("mongoose");
module.exports.userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    owner: Joi.string().hex().length(24),
    likes: Joi.array().required(),
    link: Joi.link().required(),
    createdAt: Joi.date().required(),
  }),
});
module.exports.errHandler = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
};
