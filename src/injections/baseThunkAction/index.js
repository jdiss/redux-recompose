function baseThunkAction(type, target, serviceMethod, selector = () => {}) {
  return {
    prebehavior: dispatch => dispatch({ type, target }),
    apiCall: async getState => serviceMethod(selector(getState())),
    determination: response => response.ok,
    success: (dispatch, response) => dispatch({ type: `${type}_SUCCESS`, target, payload: response.data }),
    failure: (dispatch, response) => dispatch({ type: `${type}_FAILURE`, target, payload: response.problem })
  };
}

export default baseThunkAction;
