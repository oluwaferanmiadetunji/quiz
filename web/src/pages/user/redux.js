export const SET_USER = 'SET_USER';

export default (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
};
