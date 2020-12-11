import { combineReducers } from 'redux';
import { reducer as loginReducer } from './login';
import { reducer as UserReducer } from './user';
import { reducer as QuestionReducer } from './questions';

const allReducers = combineReducers({
	isUserLoggedIn: loginReducer,
	user: UserReducer,
	question: QuestionReducer,
});

export default allReducers;
