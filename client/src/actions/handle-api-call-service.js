const handleApiCall = (requestUrl, httpMethod, bodyData, requestFunc, successFunc, failureFunc) => {
  return (dispatch) => {
    dispatch(requestFunc());
    let fetchInit = (httpMethod !== 'GET') ? {body: JSON.stringify(bodyData)} : {}; 
    fetchInit = {
      ...fetchInit,
      method: httpMethod, 
      credentials: 'include',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    fetch(requestUrl, fetchInit)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.statusText}: ${res.error}`);
      }
      return res.json();
    })
    .then(json => dispatch(successFunc(json[0])))
    .catch(error => dispatch(failureFunc(error)));
  };
};

export default handleApiCall;