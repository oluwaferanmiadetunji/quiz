export const SET_USERS = 'SET_USERS';
export const DELETE_USER = 'DELETE_USER';

export default (state = [], action) => {
	switch (action.type) {
		case SET_USERS:
			return action.payload;
		case DELETE_USER:
			let index = state.findIndex((question) => question.key === action.payload);
			state.splice(index, 1);
			return [...state];
		default:
			return state;
	}
};

// correct(pin):8
// count(pin):10
// createdAt(pin):1603637958000
// duration(pin):20
// email(pin):"oluwaferanmiadetunji111@gmail.com"
// lastLogin(pin):1604816555275
// name(pin):"Adetunji Oluwaferanmi O"
// status(pin):"Free"
// times(pin):26
// total(pin):224
