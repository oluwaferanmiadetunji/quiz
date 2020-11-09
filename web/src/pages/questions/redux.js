export const SET_QUESTIONS = 'SET_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export const addQuestion = (payload) => ({
	type: ADD_QUESTION,
	payload,
});

export default (state = [], action) => {
	switch (action.type) {
		case SET_QUESTIONS:
			return action.payload;
		case DELETE_QUESTION:
			let index = state.findIndex((course) => course.key === action.payload);
			state.splice(index, 1);
			return [...state];
		case ADD_QUESTION:
			return [action.payload, ...state];
		default:
			return state;
	}
};
