/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import actions from '../actions';

export const AddQuestion = () => {
  const dispatch = useDispatch();
  const classes = Styles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const invalid = email === '' || password === '' || password.length < 6 || !email.trim().match(re);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loading = useSelector((state) => state.addAdminLoading);
  const message = useSelector((state) => state.addAdminMessage);

  // function to handle user input on email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actions.clearMessage());
    dispatch(actions.loading(true));
    dispatch(actions.addAdmin({ email, password }));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Add Admin</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formField}>
          <TextField
            error={email.length > 0 && !email.trim().match(re) ? true : false}
            helperText={email.length > 0 && !email.trim().match(re) ? 'Please, enter a valid email' : ''}
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', border: 'white' } }}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            error={password.length > 0 && password.length < 6 ? true : false}
            helperText={password.length > 0 && password.length < 6 ? 'The password must be at least 6 characters' : ''}
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', border: 'white' } }}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {message && (
          <Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
        <Button
          style={{ background: '#000', color: 'yellow' }}
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          disabled={invalid}
        >
          {loading ? 'Connecting' : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default AddQuestion;
