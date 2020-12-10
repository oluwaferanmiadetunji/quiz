const SET_DETAILS = 'SET_DETAILS';
const EDIT_DETAILS = 'EDIT_DETAILS';

const setDetails = (value) => ({
	payload: value,
	type: SET_DETAILS,
});

const editDetails = (value) => ({
	payload: value,
	type: EDIT_DETAILS,
});

const reducer = (state = {}, action) => {
	switch (action.type) {
		case SET_DETAILS:
			return action.payload;
		case EDIT_DETAILS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export { reducer, setDetails, editDetails };
