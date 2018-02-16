const {Card, Board} = require('./models');

var data = {
  getBoardAndLists: (id) => Board.getBoardAndLists(id),
  updateAnyDoc: (modelType, id, data, boardId) => {
    console.log("updateAnyDoc", modelType, id, data, boardId);
    return Card.updateOne(id, data)
    .then(() => Board.getBoardAndLists(boardId))
    .catch(e => console.log(e));
  },
};


// var data = {};

// data.getBoardAndLists = (id) => {
//   return Board.getBoardAndLists(id);
// };


// data.updateAnyDoc = (modelType, id, data, boardId) => {
//   //update record
//   console.log("updateAnyDoc", modelType, id, data, boardId);
//   return Card.updateOne(id, data)
//   .then(() => data.getBoardAndLists(boardId))
//   .catch(e => console.log(e));
// };


module.exports = data;