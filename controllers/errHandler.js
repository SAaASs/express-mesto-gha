const { Mongoose } = require('mongoose');

module.exports.errHandler = (err, res) => {
  if (err instanceof Mongoose.CastError) {
    res.status(400).send(err);
  }
};
