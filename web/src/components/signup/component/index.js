import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { SignUpForm } from './Signup';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const SignUpPage = compose(withRouter, withFirebase)(SignUpForm);

function Signup() {
  const dispatch = useDispatch();
  dispatch(setTitle('Sign Up'));
  return <SignUpPage />;
}

export default Signup;
