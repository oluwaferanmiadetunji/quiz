import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PUBLIC_ROUTE_PATHS } from '../utils/constants';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
	<Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to={PUBLIC_ROUTE_PATHS.LOGIN} />)} />
);

const mapStateToProps = (state) => ({
	isLogged: state.isLogged,
});

export default connect(mapStateToProps)(PrivateRoute);
