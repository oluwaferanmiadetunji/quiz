const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

const isLogged = (value) => ({
	payload: value,
	type: USER_AUTHENTICATED,
});

const reducer = (state = false, action) => {
	switch (action.type) {
		case USER_AUTHENTICATED:
			return action.payload;
		default:
			return state;
	}
};

export { reducer, isLogged };
