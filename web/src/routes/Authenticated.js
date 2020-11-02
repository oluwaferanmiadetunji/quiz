import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GENERIC_ROUTES_PATHS, AUTH_ROUTE_PATHS } from '../utils/constants';
import { AUTH_ROUTES } from './routes';

export default function Authenticated() {
	return (
		<BrowserRouter>
			<Switch>
				{AUTH_ROUTES.map(({ path, component: Component, exact }) => (
					<Route key={path} path={path} exact={exact}>
						<Component />
					</Route>
				))}
				<Route path={GENERIC_ROUTES_PATHS.WILD_CARD}>
					<Redirect to={AUTH_ROUTE_PATHS.ADD_ADMIN} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
