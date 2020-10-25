import React, { useState } from 'react';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { v1 as uuidv1 } from 'uuid';
import { SUCCESS_MESSAGE, FAILURE_MESSAGE } from './constant';

export const AddCourseForm = ({ firebase }) => {
  const classes = Styles();
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const invalid = course.trim() === '';

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    let courseData = {
      createdAt: '',
      course: ''
    };
    courseData.createdAt = firebase.serverValue.TIMESTAMP;
    courseData.course = course.trim().replace(/^./, course.trim()[0].toUpperCase());

    firebase
      .course(uuidv1())
      .set(courseData)
      .then(() => {
        setCourse('');
        setMessage(SUCCESS_MESSAGE);
      })
      .catch(() => {
        setMessage(FAILURE_MESSAGE);
      });
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formField}>
          <TextField
            id="course"
            label="Course *"
            variant="outlined"
            autoFocus
            error={course.length > 0 && course.trim() === '' ? true : false}
            helperText={course.length > 0 && course.trim() === '' ? 'Enter a course' : ''}
            fullWidth
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>

        {message && (
          <Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
        <Button
          style={{ background: '#111', color: 'yellow' }}
          variant="contained"
          disabled={invalid}
          onClick={handleSubmit}
        >
          {loading ? 'Connecting' : 'Add'}
        </Button>
      </form>
    </div>
  );
};
