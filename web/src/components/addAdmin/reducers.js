import { LOADING, SET_MESSAGE } from './actionTypes';

const loading = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
};

const message = (state = '', action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default { loading, message };
