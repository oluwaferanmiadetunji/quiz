const IS_LOGGED = 'IS_LOGGED';

export const isLogged = (payload) => ({
	type: IS_LOGGED,
	payload,
});

const authReducer = (state = false, action) => {
	switch (action.type) {
		case IS_LOGGED:
			return action.payload;
		default:
			return state;
	}
};

export default authReducer;
