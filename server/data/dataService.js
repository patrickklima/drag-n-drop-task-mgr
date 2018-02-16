const model = require('./models');

var data = {
  getBoardAndLists: (id) => model.Board.getBoardAndLists(id),
  updateAnyDoc: (modelType, id, data, boardId) => {
    console.log("updateAnyDoc", modelType, id, data, boardId);
    return model[modelType].updateOne(id, data)
    .then(() => model.Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  },
};

module.exports = data;