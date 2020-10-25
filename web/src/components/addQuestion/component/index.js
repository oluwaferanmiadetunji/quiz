import React from 'react';
import { AddQuestionForm } from './AddQuestion';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const AddQuestionPage = compose(withFirebase)(AddQuestionForm);

function AddQuestion() {
  const dispatch = useDispatch();
  dispatch(setTitle('Add Question'));
  return <AddQuestionPage />;
}

export default AddQuestion;
