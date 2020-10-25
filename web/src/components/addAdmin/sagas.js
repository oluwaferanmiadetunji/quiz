import { put, takeLatest, call } from 'redux-saga/effects';
import { TRY_ADD_ADMIN, SET_MESSAGE } from './actionTypes';
import actions from './actions';
import axios from 'axios';

const addAdmin = function* addAdmin(action) {
  try {
    const response = yield call(() => axios.post('/admin/register', action.payload));
    yield put({ type: SET_MESSAGE, payload: response.data.message });
  } catch (err) {
    yield put({ type: SET_MESSAGE, payload: err.response.data.message });
  }
  yield put(actions.loading(false));
};

function* addAdminSaga() {
  yield takeLatest(TRY_ADD_ADMIN, addAdmin);
}

export default addAdminSaga;
