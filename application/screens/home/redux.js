const USER_DATA = 'USER_DATA';

const setData = (data) => ({
	payload: data,
	type: USER_DATA,
});

const reducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DATA:
			return action.payload;
		default:
			return state;
	}
};

export { reducer, setData };
