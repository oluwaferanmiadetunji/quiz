const IS_LOGGED = 'IS_LOGGED';

export const isLogged = (payload) => ({
	type: IS_LOGGED,
	payload,
});

export default (state = false, action) => {
	switch (action.type) {
		case IS_LOGGED:
			return action.payload;
		default:
			return state;
	}
};
