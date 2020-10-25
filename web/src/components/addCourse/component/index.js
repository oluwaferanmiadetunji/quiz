import React from 'react';
import { AddCourseForm } from './AddCourse';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

const AddCoursePage = compose(withFirebase)(AddCourseForm);

function AddCourse() {
  const dispatch = useDispatch();
  dispatch(setTitle('Add Course'));
  return <AddCoursePage />;
}

export default AddCourse;
