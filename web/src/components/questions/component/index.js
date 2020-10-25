import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './Questions';
import { withFirebase } from '../../firebase';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const Question = compose(withRouter, withFirebase)(Page);

function QuestionPage() {
  const dispatch = useDispatch();
  dispatch(setTitle('Questions'));
  return <Question />;
}

export default QuestionPage;
