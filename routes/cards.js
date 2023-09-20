const cardsRouter = require("express").Router(); // создали роутер
const { createCardValidator } = require("../middlewares/errHandler");
const {
  likeCard,
  unlikeCard,
  getAllCards,
  deleteCardById,
  createCard,
} = require("../controllers/cards");

cardsRouter.get("/", getAllCards);
cardsRouter.delete("/:cardId", deleteCardById);
cardsRouter.post("/", createCardValidator, createCard);
cardsRouter.put("/:cardId/likes", likeCard);
cardsRouter.delete("/:cardId/likes", unlikeCard);

module.exports = { cardsRouter };
