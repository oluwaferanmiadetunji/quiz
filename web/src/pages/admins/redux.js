export const SET_ADMINS = 'SET_ADMINS';
export const ADD_ADMIN = 'ADD_ADMIN';

export default (state = [], action) => {
	switch (action.type) {
		case SET_ADMINS:
			return action.payload;
		case ADD_ADMIN:
			return [action.payload, ...state];
		default:
			return state;
	}
};
