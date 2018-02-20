const baseUrl = {
  dev: 'http://localhost:8080',
};
const env = 'dev';

export const GET_AUTH_REQUEST = "GET_AUTH_REQUEST";
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";
export const GET_AUTH_FAILURE = "GET_AUTH_FAILURE";

export const getAuthRequest = () => {
  return {
    type: GET_AUTH_REQUEST
  };
}
export const getAuthSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    data: data
  };
}
export const getAuthFailure = (error) => {
  return {
    type: GET_AUTH_FAILURE,
    data: error
  };
}
export const getAuth = () => {
  return (dispatch) => {
    dispatch(getAuthRequest());
    
    fetch(`${baseUrl[env]}/authenticate`)
    .then(res => {
      if (!res.ok) {
        dispatch(getAuthFailure(res.error()));
      }
      dispatch(getAuthSuccess(true));
    })
  };
}
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST
  };
}
export const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_SUCCESS,
    data: data
  };
}
export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    data: error
  };
}
export const registerUser = (username, password) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    console.log("registerUser", username, password, `${baseUrl[env]}/register`);
    fetch(`${baseUrl[env]}/register`, {
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({username, password})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.statusText}: ${res.error()}`);
      } 
      return res.json();
    })
    .then(user => dispatch(registerUserSuccess(user)))
    .catch(error => dispatch(registerUserFailure(error)))
  };
}

