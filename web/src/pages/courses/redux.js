const SET_COURSES = 'SET_COURSES';

export const setCourses = (payload) => ({
	type: SET_COURSES,
	payload,
});

export default (state = [], action) => {
	switch (action.type) {
		case SET_COURSES:
			return action.payload;
		default:
			return state;
	}
};
