import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AUTH_ROUTE_PATHS } from '../utils/constants';

const AuthRoute = ({ component: Component, isLogged, ...rest }) => (
	<Route {...rest} render={(props) => (isLogged ? <Redirect to={AUTH_ROUTE_PATHS.ADD_ADMIN} /> : <Component {...props} />)} />
);

const mapStateToProps = (state) => ({
	isLogged: state.isLogged,
});

export default connect(mapStateToProps)(AuthRoute);
