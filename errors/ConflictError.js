class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 509;
  }
}
module.exports = ConflictError;
