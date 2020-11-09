import { combineReducers } from 'redux';
import authReducer from '../pages/login/redux';
import coursesReducer from '../pages/courses/redux';
import titleReducer from '../components/layout/redux';
import questionsReducer from '../pages/questions/redux';
import questionReducer from '../pages/question/redux';
import adminsReducer from '../pages/admins/redux';

export default combineReducers({
	isLogged: authReducer,
	title: titleReducer,
	courses: coursesReducer,
	questions: questionsReducer,
	question: questionReducer,
	admins: adminsReducer,
});
