const SET_TITLE = 'SET_TITLE';

export const setTitle = (data) => ({
  type: SET_TITLE,
  payload: data
});

export const titleReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TITLE:
      return action.payload;
    default:
      return state;
  }
};
