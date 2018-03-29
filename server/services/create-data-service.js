const models = require('../data/models');

const errorCatch = (err) => console.log("error in create-data-service", err);

module.exports = {
  createCard: async (cardTitle, listId) => {
    console.log("createcard", cardTitle, listId);
    const newCard = await new models.Card({cardTitle}).save().catch(errorCatch);
    let parentList = await models.List.findById(listId).catch(errorCatch);
    parentList.cards = [...parentList.cards, newCard._id];
    return await parentList.save().catch(errorCatch);
  },
  createList: async (listTitle, boardId) => {
    console.log("createList", listTitle, boardId);
    const newList = await new models.List({listTitle}).save().catch(errorCatch);
    let parentBoard = await models.Board.findById(boardId).catch(errorCatch);
    parentBoard.lists = [...parentBoard.lists, newList._id];
    return await parentBoard.save().catch(errorCatch);
  },
};

