import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import FlashMessage from 'react-native-flash-message';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import jwtDecode from 'jwt-decode';
import { isLogged } from './redux/login';
import { _retrieveData } from './utils/storage';
import { makeGetReq } from './utils/api';
import { setDetails } from './redux/user';

const store = createStore(reducer);

(async () => {
	try {
		const token = await _retrieveData('Token');
		const decoded = jwtDecode(token);
		if (decoded.exp * 1000 < Date.now()) {
			store.dispatch(isLogged(false));
		} else {
			store.dispatch(isLogged(true));
			const { data } = await makeGetReq('user');
			store.dispatch(setDetails(data));
		}
	} catch (err) {
		store.dispatch(isLogged(false));
	}
})();

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
			<FlashMessage position='top' />
		</Provider>
	);
}
