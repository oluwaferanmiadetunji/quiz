import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './Admins';
import { withFirebase } from '../../firebase';

const Users = compose(withRouter, withFirebase)(Page);

function UsersPage() {
  return  <Users />
}


export default (UsersPage);
