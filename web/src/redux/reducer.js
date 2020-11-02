import { combineReducers } from 'redux';
import authReducer from '../pages/login/redux';
import titleReducer from '../components/layout/redux';

export default combineReducers({
	isLogged: authReducer,
	title: titleReducer,
});
