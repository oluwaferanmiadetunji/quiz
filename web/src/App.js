import React, { lazy } from 'react';
import { isLoggedIn } from './utils/helpers';

const AuthRouter = lazy(() => import('./routes/Authenticated'));
const PublicRouter = lazy(() => import('./routes/Unauthenticated'));

function App() {
	return isLoggedIn() ? <AuthRouter /> : <PublicRouter />;
}

export default App;
