const {
  User,
  Board, 
  List,
  Card 
} = require('./models');

const data = {};
data.User = {};
data.User.find = (username) => User.find({username});

data.geAlltBoardsAndLists = () => {
  return Board.geAlltBoardsAndLists();
}

data.getListAndCards = (id) => {
  return List.getListAndCards(id);
}




module.exports = data;