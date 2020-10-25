import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADD_ADMIN } from '../../constant';

const PrivateRoute = ({ component: Component, isUserLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isUserLoggedIn === true ? <Redirect to={ADD_ADMIN} /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
