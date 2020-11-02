const SET_TITLE = 'SET_TITLE';

export const setTitle = (data) => ({
	type: SET_TITLE,
	payload: data,
});

export default (state = '', action) => {
	switch (action.type) {
		case SET_TITLE:
			return action.payload;
		default:
			return state;
	}
};
