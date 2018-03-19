import handleApiCall from './handle-api-call-service';
const baseUrl = {
  dev: 'http://localhost:8080',
};
const env = 'dev';
const createOrLogInPath = {
  true: 'register',
  false: 'login'
}

export const getAuth = () => {
  return handleApiCall(
    `${baseUrl[env]}/authenticate`,
    'GET',
    {},
    getAuthRequest,
    getAuthSuccess,
    getAuthFailure
  );
};

export const createOrLogInUser = (username, password, createNewAccount) => {
  return handleApiCall(
    `${baseUrl[env]}/${createOrLogInPath[createNewAccount]}`,
    'POST',
    {username, password},
    createOrLogInUserRequest,
    createOrLogInUserSuccess,
    createOrLogInUserFailure
  );
};

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

export const CREATE_OR_LOG_IN_USER_REQUEST = "CREATE_OR_LOG_IN_USER_REQUEST";
export const CREATE_OR_LOG_IN_USER_SUCCESS = "CREATE_OR_LOG_IN_USER_SUCCESS";
export const CREATE_OR_LOG_IN_USER_FAILURE = "CREATE_OR_LOG_IN_USER_FAILURE";

export const createOrLogInUserRequest = () => {
  return {
    type: CREATE_OR_LOG_IN_USER_REQUEST
  };
}
export const createOrLogInUserSuccess = (data) => {
  console.log('createOrLogInUserSuccess',data);
  return {
    type: CREATE_OR_LOG_IN_USER_SUCCESS,
    data: data
  };
}
export const createOrLogInUserFailure = (error) => {
  return {
    type: CREATE_OR_LOG_IN_USER_FAILURE,
    data: error
  };
}


