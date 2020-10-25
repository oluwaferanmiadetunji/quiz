import { TRY_LOGIN, LOGIN_LOADING, USER_AUTHENTICATED, LOGIN_REQUEST_COMPLETE } from './actionTypes';

const loginUser = (data) => ({
  type: TRY_LOGIN,
  payload: data
});

const loginLoading = (value) => ({
  payload: value,
  type: LOGIN_LOADING
});

const isLogged = (value) => ({
  payload: value,
  type: USER_AUTHENTICATED
});

const clearMessage = () => ({
  payload: '',
  type: LOGIN_REQUEST_COMPLETE
});

export default { loginUser, loginLoading, isLogged, clearMessage };
