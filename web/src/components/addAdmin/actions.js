import {  LOADING, TRY_ADD_ADMIN, SET_MESSAGE } from './actionTypes';

const addAdmin = (data) => ({
  type: TRY_ADD_ADMIN,
  payload: data
});

const loading = (value) => ({
  payload: value,
  type: LOADING
});

const clearMessage = () => ({
  payload: '',
  type: SET_MESSAGE
});

export default { addAdmin, loading, clearMessage };
