const models = require('../data/models');

module.exports = {
  getBoardAndLists: (id) => {
    return models.Board.getBoardAndLists(id)
    .then(board => {
      console.log(board)
      return board;
    });
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

