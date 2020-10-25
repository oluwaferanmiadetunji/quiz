import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './Question';
import { withFirebase } from '../../firebase';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const Questions = compose(withRouter, withFirebase)(Page);

function QuestionsPage() {
  const dispatch = useDispatch();
  dispatch(setTitle('Questions'));
  return <Questions />;
}

export default QuestionsPage;
