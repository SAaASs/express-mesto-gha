const getAllCardsRouter = require('express').Router(); // создали роутер
const deleteCardByIdRouter = require('express').Router(); // создали роутер
const createCardRouter = require('express').Router(); // создали роутер
const likeCardRouter = require('express').Router(); // создали роутер
const unlikeCardRouter = require('express').Router(); // создали роутер
const {
  likeCard, unlikeCard, getAllCards, deleteCardById, createCard,
} = require('../controllers/cards');

getAllCardsRouter.get('/cards/', getAllCards);
deleteCardByIdRouter.delete('/cards/:cardId', deleteCardById);
createCardRouter.post('/cards/', createCard);
likeCardRouter.put('/cards/:cardId/likes', likeCard);
unlikeCardRouter.delete('/cards/:cardId/likes', unlikeCard);

module.exports = {
  createCardRouter, getAllCardsRouter, deleteCardByIdRouter, likeCardRouter, unlikeCardRouter,
};
