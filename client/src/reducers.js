import {combineReducers} from 'redux';
import * as BoardActions from './actions/BoardActions';

const initialState = {
  boardState: {
    _id: '5a7a572d638fed00a56629f9',
    boardTitle: '',
    lists: [],
    isFetching: false, 
    error: null
  },
};

const boardState = (state=initialState.boardState, action) => {
  switch (action.type) {
    case BoardActions.GET_BOARD_SUCCESS:
      console.log("reducer", "BoardActions.GET_BOARD_SUCCESS", action);
      const {_id, boardTitle, lists} = action.data
      return {
        ...state,
        _id,
        boardTitle,
        lists,
        isFetching: false, 
        error: null
      };
    case BoardActions.GET_BOARD_FAILURE: 
      return {
        ...state,
        error: action.data,
        isFetching: false
      };
    case BoardActions.GET_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    default: 
      return state;
  }
    
}

export default combineReducers({boardState});