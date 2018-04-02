const models = require('../data/models');

module.exports = {
  updateAnyDoc: (modelType, id, data, boardId) => {
    console.log("updateAnyDoc", modelType, id, data, boardId);
    return models[modelType].updateOne(id, data)
    .then(() => models.Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  },
  moveCard: (movingCardId, fromListId, toListId, boardId) => {
    console.log("moveCard", movingCardId, fromListId, toListId);
    return models.List.removeCard(fromListId, movingCardId)
    .then(() => models.List.addCard(toListId, movingCardId))
    .then(() => models.Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  }
};

