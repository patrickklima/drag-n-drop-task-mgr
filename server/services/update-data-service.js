const models = require('../data/models');

module.exports = {
  updateAnyDoc: (modelType, id, data, boardId) => {
    console.log("updateAnyDoc", modelType, id, data, boardId);
    return models[modelType].updateOne(id, data)
    .then(() => models.Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  },
};

