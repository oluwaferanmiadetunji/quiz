/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, isUserLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (isUserLoggedIn === true ? <Component {...props} /> : <Redirect to="/" />)} />
);

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn
});

export default connect(mapStateToProps)(AuthRoute);
