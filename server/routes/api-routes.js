const express = require('express');
const router = express.Router();
const {
  getBoardAndLists, 
  updateAnyDoc, 
  createCard, 
  createList,
  } = require('../services/data-service');


router.get('/get/board/:id', (req, res, next) => {
  console.log("boards - received request")
  getBoardAndLists(req.params.id)
  .then(data => {
    console.log("Boards - sending data",data)
    res.json(data)})
  .catch(e => next(e));
});

router.put('/put/:docType/:id', (req, res, next) => {
  const {docType, id} = req.params;
  const {data, boardId} = req.body;
  updateAnyDoc(docType, id, data, boardId)
  .then(response => {
    console.log(`update ${docType} - sending response`,response);
    return response;
  })
  .then(response => res.json(response))
  .catch(err => next(err));
});

router.post('/post/card', (req, res, next) => {
  const {cardTitle, listId, boardId} = req.body;
  createCard(cardTitle, listId, boardId)
  .then(() => getBoardAndLists(boardId))
  .then(board => res.json(board))
  .catch(err => next(err));
});

router.post('/post/list', (req, res, next) => {
  const {listTitle, boardId} = req.body;
  createList(listTitle, boardId)
  .then(() => getBoardAndLists(boardId))
  .then(board => res.json(board))
  .catch(err => next(err));
});

module.exports = router;