import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../screens/login/redux';

const allReducers = combineReducers({
	isUserLoggedIn: loginReducer,
});

export default allReducers;
