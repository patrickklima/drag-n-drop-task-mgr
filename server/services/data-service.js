const models = require('../data/models');




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
  getFullUserById: (id) => models.User.getFullUserById(id),
  getFullUserByUserName: (username) => {
    return models.User.getFullUserByUserName(username)
    .then(user => {
      console.log("getFullUserByUserName", user)
      return user;
    })
  },
};

