import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { LoginForm } from './Login';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const LoginWithLayout = compose(withRouter, withFirebase)(LoginForm);

function Login() {
  const dispatch = useDispatch();
  dispatch(setTitle('Login'));
  return <LoginWithLayout />;
}

export default Login;
