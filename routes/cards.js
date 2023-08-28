const cardsRouter = require('express').Router(); // создали роутер
const {
  likeCard, unlikeCard, getAllCards, deleteCardById, createCard,
} = require('../controllers/cards');

cardsRouter.get('/cards/', getAllCards);
cardsRouter.delete('/cards/:cardId', deleteCardById);
cardsRouter.post('/cards/', createCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', unlikeCard);

module.exports = { cardsRouter };
