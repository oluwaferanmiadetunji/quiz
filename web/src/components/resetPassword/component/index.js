import React from 'react';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { ResetPasswordForm } from './ResetPassword';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const ResetPasswordPage = compose(withFirebase)(ResetPasswordForm);

function ResetPassword() {
  const dispatch = useDispatch();
  dispatch(setTitle('Reset Password'));
  return <ResetPasswordPage />;
}

export default ResetPassword;
