const cardsRouter = require("express").Router(); // создали роутер
const {
  createCardValidator,
  changeCardStateValidator,
} = require("../middlewares/errHandler");
const {
  likeCard,
  unlikeCard,
  getAllCards,
  deleteCardById,
  createCard,
} = require("../controllers/cards");

cardsRouter.get("/", getAllCards);
cardsRouter.delete("/:cardId", changeCardStateValidator, deleteCardById);
cardsRouter.post("/", createCardValidator, createCard);
cardsRouter.put("/:cardId/likes", changeCardStateValidator, likeCard);
cardsRouter.delete("/:cardId/likes", changeCardStateValidator, unlikeCard);

module.exports = { cardsRouter };
