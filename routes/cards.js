const cardsRouter = require("express").Router(); // создали роутер
const { cardValidator } = require("../middlewares/errHandler");
const {
  likeCard,
  unlikeCard,
  getAllCards,
  deleteCardById,
  createCard,
} = require("../controllers/cards");

cardsRouter.get("/", cardValidator, getAllCards);
cardsRouter.delete("/:cardId", cardValidator, deleteCardById);
cardsRouter.post("/", cardValidator, createCard);
cardsRouter.put("/:cardId/likes", cardValidator, likeCard);
cardsRouter.delete("/:cardId/likes", cardValidator, unlikeCard);

module.exports = { cardsRouter };
