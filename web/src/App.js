import React from 'react';
import Routes from './routes';
import Theme from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<Routes />
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
