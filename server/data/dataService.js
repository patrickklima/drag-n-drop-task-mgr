const {
  User,
  Board, 
  List,
  Card 
} = require('./models');

const data = {};
data.User = {};
data.User.find = (username) => User.find({username});

data.getBoardAndLists = (id) => {
  return Board.getBoardAndLists(id);
}

data.updateDoc = (modelType, id, data, boardId) => {
  //update record
  [modelType].update(id, data)
  .then(() => data.getBoardAndLists(boardId));
  //query for parent
  //getBoardAndLists(board.id)
};



module.exports = data;