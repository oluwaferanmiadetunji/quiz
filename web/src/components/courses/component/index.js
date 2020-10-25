import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Page from './Courses';
import { withFirebase } from '../../firebase';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const Course = compose(withRouter, withFirebase)(Page);

function CoursePage() {
  const dispatch = useDispatch();
  dispatch(setTitle('Course'));
  return <Course />;
}

export default CoursePage;
