import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/loader';
import Theme from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
	<Suspense fallback={<Loader />}>
		<Provider store={store}>
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<App />
				<ToastContainer />
			</ThemeProvider>{' '}
		</Provider>
	</Suspense>,
	document.getElementById('root'),
);
