import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../screens/login/redux';

const allReducers = combineReducers({
	login: loginReducer,
});

export default allReducers;
