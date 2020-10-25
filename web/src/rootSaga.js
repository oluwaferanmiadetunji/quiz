import { all } from 'redux-saga/effects';
import { saga as loginSaga } from './components/login';
import { saga as addAdminSaga } from './components/addAdmin';

export default function* rootSaga() {
  yield all([loginSaga(), addAdminSaga()]);
}
