import { combineReducers } from 'redux';
import { reducers as loginReducer } from './components/login';
import { reducers as addAdminReducer } from './components/addAdmin';
import { titleReducer } from './components/layout/redux';

const allReducers = combineReducers({
  loginLoading: loginReducer.loginLoadingReducer,
  loginMessage: loginReducer.loginMessageReducer,
  isUserLoggedIn: loginReducer.authReducer,
  addAdminLoading: addAdminReducer.loading,
  addAdminMessage: addAdminReducer.message,
  title: titleReducer
});

export default allReducers;
