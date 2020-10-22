import React from 'react';
import Layout from '../../layout';
import Page from './Login';

const LoginWithLayout = Layout(Page);

function Login() {
  return <LoginWithLayout title="Login" />;
}

export default Login;
