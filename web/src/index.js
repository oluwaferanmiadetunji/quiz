import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/loader';
import { Provider } from 'react-redux';
import store from './redux';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import jwtDecode from 'jwt-decode';
import { isLogged } from './pages/login/redux';

const token = localStorage.Token;
if (token) {
	const decoded = jwtDecode(token);
	if (decoded.exp * 1000 < Date.now()) {
		store.dispatch(isLogged(false));
	} else {
		store.dispatch(isLogged(true));
	}
}

ReactDOM.render(
	<Suspense fallback={<Loader />}>
		<Provider store={store}>
			<App />
		</Provider>
	</Suspense>,
	document.getElementById('root'),
);
