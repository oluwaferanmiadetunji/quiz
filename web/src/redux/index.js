import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

const middlewares = () => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools();
	}
	return undefined;
};

export default createStore(rootReducer, middlewares());
