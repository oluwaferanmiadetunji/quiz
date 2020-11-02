import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GENERIC_ROUTES_PATHS, PUBLIC_ROUTE_PATHS } from '../utils/constants';
import { PUBLIC_ROUTES } from './routes';

export default function Authenticated() {
	return (
		<BrowserRouter>
			<Switch>
				{PUBLIC_ROUTES.map(({ path, component, exact }) => (
					<Route key={path} path={path} component={component} exact={exact} />
				))}
				<Route path={GENERIC_ROUTES_PATHS.WILD_CARD}>
					<Redirect to={PUBLIC_ROUTE_PATHS.LOGIN} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
