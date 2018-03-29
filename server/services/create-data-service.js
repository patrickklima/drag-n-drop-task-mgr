const models = require('../data/models');

const errorCatch = (err) => console.log("error in create-data-service", err);

let service = {};
service.createCard = async (cardTitle, listId) => {
  console.log("createcard", cardTitle, listId);
  const newCard = await new models.Card({cardTitle}).save().catch(errorCatch);
  let parentList = await models.List.findById(listId).catch(errorCatch);
  parentList.cards = [...parentList.cards, newCard._id];
  await parentList.save().catch(errorCatch);
  return newCard;
};
service.createList = async (listTitle, boardId) => {
  console.log("createList", listTitle, boardId);
  const newList = await new models.List({listTitle}).save().catch(errorCatch);
  let parentBoard = await models.Board.findById(boardId).catch(errorCatch);
  parentBoard.lists = [...parentBoard.lists, newList._id];
  await parentBoard.save().catch(errorCatch);
  return newList;
};
service.createBoard = async (boardTitle, userId) => {
  console.log("createBoard", boardTitle, userId);
  const newBoard = await new models.Board({
    boardTitle,
    lists: [],
    members: [userId]
  }).save().catch(errorCatch);
  console.log("createBoard is done", newBoard);
  const newList = await service.createList("New List", newBoard._id);
  const newCard = await service.createCard("New Card", newList._id);
  console.log("newBoard", newBoard);
  return newBoard;
};

module.exports = service;
