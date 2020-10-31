import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import FlashMessage from 'react-native-flash-message';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import jwtDecode from 'jwt-decode';
import { isLogged } from './screens/login/redux';
import { _retrieveData } from './utils/storage';

const store = createStore(reducer);

_retrieveData('Token')
	.then((token) => {
		const decoded = jwtDecode(token);
		if (decoded.exp * 1000 < Date.now()) {
			store.dispatch(isLogged(false));
		} else {
			store.dispatch(isLogged(true));
		}
	})
	.catch(() => store.dispatch(isLogged(false)));

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
			<FlashMessage position='top' />
		</Provider>
	);
}
