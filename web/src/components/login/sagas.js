import { put, takeLatest, call } from 'redux-saga/effects';
import { TRY_LOGIN, LOGIN_REQUEST_COMPLETE } from './actionTypes';
import actions from './actions';
import axios from 'axios';

const login = function* login(action) {
  try {
    const response = yield call(() => axios.post('/admin/login', action.payload));
    const Token = `Bearer ${response.data.data}`;
    localStorage.setItem('Token', Token);
    axios.defaults.headers.common['Authorization'] = Token;
    yield put({ type: LOGIN_REQUEST_COMPLETE, payload: '' });
    yield put(actions.isLogged(true));
  } catch (err) {
    yield put({ type: LOGIN_REQUEST_COMPLETE, payload: err.response.data.message });
    yield put(actions.isLogged(false));
  }
  yield put(actions.loginLoading(false));
};

function* loginSaga() {
  yield takeLatest(TRY_LOGIN, login);
}

export default loginSaga;
