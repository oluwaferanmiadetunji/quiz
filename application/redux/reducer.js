import { combineReducers } from 'redux';
import { reducer as loginReducer } from './login';
import { reducer as UserReducer } from './user';

const allReducers = combineReducers({
	isUserLoggedIn: loginReducer,
	user: UserReducer,
});

export default allReducers;
