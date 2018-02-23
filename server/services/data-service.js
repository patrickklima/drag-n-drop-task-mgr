const models = require('../data/models');

const errorCatch = (err) => err;

module.exports = {
  getBoardAndLists: (id) => {
    return models.Board.getBoardAndLists(id)
    .then(board => {
      console.log(board)
      return board;
    });
  },
  updateAnyDoc: (modelType, id, data, boardId) => {
    console.log("updateAnyDoc", modelType, id, data, boardId);
    return models[modelType].updateOne(id, data)
    .then(() => models.Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  },
  createCard: async (cardTitle, listId) => {
    console.log("createcard", cardTitle, listId);
    const newCard = await new models.Card({cardTitle}).save().catch(errorCatch);
    let parentList = await models.List.findById(listId).catch(errorCatch);
    parentList.cards = [...parentList.cards, newCard._id];
    const updatedList = await parentList.save().catch(errorCatch);
    return;
  },
  createList: async (listTitle, boardId) => {
    console.log("createList", listTitle, boardId);
    const newList = await new models.List({listTitle}).save().catch(errorCatch);
    let parentBoard = await models.Board.findById(boardId).catch(errorCatch);
    parentBoard.lists = [...parentBoard.lists, newList._id];
    const updatedBoard = await parentBoard.save();
    return; 
  },
  getFullUserById: (id) => models.User.getFullUserById(id),
  getFullUserByUserName: (username) => {
    return models.User.getFullUserByUserName(username)
    .then(user => {
      console.log("getFullUserByUserName", user)
      return user;
    })
  },
};

