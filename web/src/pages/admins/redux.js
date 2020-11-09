export const SET_COURSES = 'SET_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';
export const ADD_COURSE = 'ADD_COURSE';

export const addCourse = (payload) => ({
	type: ADD_COURSE,
	payload,
});

export default (state = [], action) => {
	switch (action.type) {
		case SET_COURSES:
			return action.payload;
		case DELETE_COURSE:
			let index = state.findIndex((course) => course.key === action.payload);
			state.splice(index, 1);
			return [...state];
		case ADD_COURSE:
			return [action.payload, ...state];
		default:
			return state;
	}
};
