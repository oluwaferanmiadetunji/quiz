import React from 'react';
import Layout from '../../layout';
import Page from './Register';

const RegisterWithLayout = Layout(Page);

function Register() {
  return <RegisterWithLayout title="Register" />;
}

export default Register;
