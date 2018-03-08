const baseUrl = {
  dev: 'http://localhost:8080/api',
};
const env = 'dev';

export const getBoard = (id) => {
  return (dispatch) => {
    dispatch(getBoardRequest())
    console.log("fetching: getBoard");
    fetch(`${baseUrl[env]}/get/board/${id}`, {
      method: 'GET', 
      credentials: 'include',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(json => {
      console.log("getBoard received data", json);
      dispatch(getBoardSuccess(json[0]));
    })
    .catch(e => {
      console.log("dispatching getBoardFailure", e);
      dispatch(getBoardFailure(e));
    });
  }
}

export const updateBoard = (type, id, data, boardId) => {
  return (dispatch) => {
    dispatch(updateBoardRequest);
    console.log("updateBoard", type, id, data, boardId);
    
    fetch(`${baseUrl[env]}/put/${type}/${id}`, {
      method: 'PUT', 
      body: JSON.stringify({data, boardId}), 
      credentials: 'include',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log("updateBoard received data", json);
      dispatch(updateBoardSuccess(json[0]));
    })
    .catch(e => {
      console.log("dispatching updateBoardFailure", e);
      dispatch(updateBoardFailure(e))
    });
  }
}
export const addNewList = (listTitle, boardId) => {
  return (dispatch) => {
    dispatch(addNewListOrCardRequest);
    console.log("addNewListOrCard", listTitle, boardId);
    
    fetch(`${baseUrl[env]}/post/list`, {
      method: 'POST', 
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({listTitle, boardId}), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log("addNewListOrCard received data", json);
      dispatch(addNewListOrCardSuccess(json[0]));
    })
    .catch(e => {
      console.log("dispatching addNewListOrCardFailure", e);
      dispatch(addNewListOrCardFailure(e))
    });
  }
}

export const addNewCard = (cardTitle, listId, boardId) => {
  return (dispatch) => {
    dispatch(addNewListOrCardRequest);
    console.log("addNewListOrCard", cardTitle, listId, boardId);
    
    fetch(`${baseUrl[env]}/post/card`, {
      method: 'POST', 
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({cardTitle, listId, boardId}), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log("addNewListOrCard received data", json);
      dispatch(addNewListOrCardSuccess(json[0]));
    })
    .catch(e => {
      console.log("dispatching addNewListOrCardFailure", e);
      dispatch(addNewListOrCardFailure(e))
    });
  }
}

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
