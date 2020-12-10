const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
const SET_TOKEN = 'SET_TOKEN';

const isLogged = (value) => ({
	payload: value,
	type: USER_AUTHENTICATED,
});

const setToken = (value) => ({
	payload: value,
	type: SET_TOKEN,
});

const initialState = {
	isLogged: false,
	token: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_AUTHENTICATED:
			return { ...state, isLogged: action.payload };
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		default:
			return state;
	}
};

export { reducer, isLogged, setToken };
