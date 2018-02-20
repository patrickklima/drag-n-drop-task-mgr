import {combineReducers} from 'redux';
import * as BoardActions from './actions/BoardActions';
import * as UserActions from './actions/UserActions';

const initial = {
  board: {
    _id: '5a7a572d638fed00a56629f9',
    boardTitle: '',
    lists: {},
    cards: {},
    isFetching: false, 
    error: null
  },
  user: {
    _id: '',
    isFetching: false,
    hasAuth: false,
    boards: [],
    error: null
  }
}
const normalizeState = (boardData) => {
  console.log("normalizeState");
  let allCards = {};
  let allLists = boardData.lists.reduce((lists, thisList) => { 
    console.log("thisList", thisList);
    allCards = thisList.cards.reduce((cards, thisCard) =>{
      console.log("thisCard", thisCard);
      cards[thisCard._id] = thisCard;
      cards[thisCard._id].listId = thisList._id;
      return cards;
    }, allCards); 
    thisList.cards = thisList.cards.map(card => card._id)
    lists[thisList._id] = thisList;
    return lists;
  }, {});

  return {
      _id: boardData._id,
      boardTitle: boardData.boardTitle,
      lists: allLists,
      cards: allCards
  };
}

const board = (state=initial.board, action) => {
  switch (action.type) {
    case BoardActions.GET_BOARD_SUCCESS:
      console.log("reducer", "BoardActions.GET_BOARD_SUCCESS", action);
      const {_id, boardTitle, lists, cards} = normalizeState(action.data);
      return {
        _id,
        boardTitle,
        lists,
        cards,
        isFetching: false, 
        error: null
      };
    case BoardActions.GET_BOARD_FAILURE: 
      return {
        ...state,
        error: action.data,
        isFetching: false,
      };
    case BoardActions.GET_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default: 
      console.log('default state returned', state);
      return state;
  }
}

const user = (state=initial.user, action) => {
  switch (action.type) {
    case UserActions.CREATE_OR_LOG_IN_USER_REQUEST: 
    case UserActions.GET_AUTH_REQUEST: 
      return {
        ...state,
        isFetching: true
      };
    case UserActions.CREATE_OR_LOG_IN_USER_SUCCESS:
    case UserActions.GET_AUTH_SUCCESS: 
      return {
        ...state,
        hasAuth: true,
        isFetching: false
      };
    case UserActions.CREATE_OR_LOG_IN_USER_FAILURE:
    case UserActions.GET_AUTH_FAILURE: 
      return {
        ...state,
        hasAuth: false,
        isFetching: false,
        error: action.data
      };
    default: 
      return state;
  };
}
export default combineReducers({board, user});
