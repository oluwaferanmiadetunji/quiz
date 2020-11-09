export const SET_COURSES = 'SET_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';

export default (state = [], action) => {
	switch (action.type) {
		case SET_COURSES:
			return action.payload;
		case DELETE_COURSE:
			let index = state.findIndex((course) => course.key === action.payload);
			state.splice(index, 1);
			return [...state]
		default:
			return state;
	}
};
