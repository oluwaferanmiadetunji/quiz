import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { AddQuestion } from './AddAdmin';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const AddAdminPage = compose(withRouter, withFirebase)(AddQuestion);

function AddAdmin() {
  const dispatch = useDispatch();
  dispatch(setTitle('Add Admin'));
  return <AddAdminPage />;
}

export default AddAdmin;
