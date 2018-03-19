import handleApiCall from './handle-api-call-service';
const baseUrl = {
  dev: 'http://localhost:8080/api',
};
const env = 'dev';

export const getBoard = (id) => {
  console.log("getBoard", id);
  return handleApiCall(
    `${baseUrl[env]}/get/board/${id}`,
    'GET', 
    {},
    getBoardRequest,
    getBoardSuccess,
    getBoardFailure
  );
};

export const updateBoard = (type, id, data, boardId) => {
  console.log("updateBoard", type, id, data, boardId);
  return handleApiCall(
    `${baseUrl[env]}/put/${type}/${id}`,
    'PUT',
    {data, boardId},
    updateBoardRequest,
    updateBoardSuccess,
    updateBoardFailure
  );
};

export const addNewList = (listTitle, boardId) => {
  console.log("addNewListOrCard", listTitle, boardId);
  return handleApiCall(
    `${baseUrl[env]}/post/list`,
    'POST',
    {listTitle, boardId},
    addNewListOrCardRequest,
    addNewListOrCardSuccess,
    addNewListOrCardFailure
  );
};

export const addNewCard = (cardTitle, listId, boardId) => {
  console.log("addNewListOrCard", cardTitle, listId, boardId);
  return handleApiCall(
    `${baseUrl[env]}/post/card`,
    'POST',
    {cardTitle, listId, boardId},
    addNewListOrCardRequest,
    addNewListOrCardSuccess,
    addNewListOrCardFailure
  );
};

export const GET_BOARD_SUCCESS =  "GET_BOARD_SUCCESS";
export const GET_BOARD_FAILURE =  "GET_BOARD_FAILURE";
export const GET_BOARD_REQUEST =  "GET_BOARD_REQUEST";

export const UPDATE_BOARD_SUCCESS =  "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE =  "UPDATE_BOARD_FAILURE";
export const UPDATE_BOARD_REQUEST =  "UPDATE_BOARD_REQUEST";

export const ADD_NEW_LIST_OR_CARD_SUCCESS =  "ADD_NEW_LIST_OR_CARD_SUCCESS";
export const ADD_NEW_LIST_OR_CARD_FAILURE =  "ADD_NEW_LIST_OR_CARD_FAILURE";
export const ADD_NEW_LIST_OR_CARD_REQUEST =  "ADD_NEW_LIST_OR_CARD_REQUEST";

export const getBoardSuccess = (data) => {
  console.log("getBoardSuccess");
  return {
    type: GET_BOARD_SUCCESS,
    data: data
  };
}
export const getBoardFailure = (error) => {
  console.log("getBoardFailure");
  
  return {
    type: GET_BOARD_FAILURE,
    data: error
  };
}
export const getBoardRequest = () => {
  console.log("getBoardRequest");
  return {
    type: GET_BOARD_REQUEST,
  };
}


export const updateBoardSuccess = (data) => {
  return {
    type: UPDATE_BOARD_SUCCESS,
    data: data
  };
}
export const updateBoardFailure = (error) => {
  return {
    type: UPDATE_BOARD_FAILURE,
    data: error
  };
}
export const updateBoardRequest = () => {
  return {
    type: UPDATE_BOARD_REQUEST,
  };
}

export const addNewListOrCardSuccess = (data) => {
  return {
    type: ADD_NEW_LIST_OR_CARD_SUCCESS,
    data: data
  };
}
export const addNewListOrCardFailure = (error) => {
  return {
    type: ADD_NEW_LIST_OR_CARD_FAILURE,
    data: error
  };
}
export const addNewListOrCardRequest = () => {
  return {
    type: ADD_NEW_LIST_OR_CARD_REQUEST,
  };
}
