import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './User';
import { withFirebase } from '../../firebase';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const User = compose(withRouter, withFirebase)(Page);

function UserPage() {
  const dispatch = useDispatch();
  dispatch(setTitle('Users'));
  return <User />;
}

export default UserPage;
