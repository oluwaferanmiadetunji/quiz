export const SET_QUESTION = 'SET_QUESTION';

export const setQuestion = (payload) => ({
	type: SET_QUESTION,
	payload,
});

export default (state = {}, action) => {
	switch (action.type) {
		case SET_QUESTION:
			return action.payload;
		default:
			return state;
	}
};
