import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './Users';
import { withFirebase } from '../../firebase';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const Users = compose(withRouter, withFirebase)(Page);

function UsersPage() {
  const dispatch = useDispatch();
  dispatch(setTitle('Users'));
  return <Users />;
}

export default UsersPage;
