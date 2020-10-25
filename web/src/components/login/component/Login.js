/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { styles } from './style';
import { RESET_PASSWORD } from '../../../constant';
import actions from '../actions';

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}))(MuiDialogActions);

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.loginLoading);
  const message = useSelector((state) => state.loginMessage);

  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const invalid = email === '' || password === '' || !email.trim().match(re);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // function to handle user input on email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actions.loginLoading(true));
    dispatch(actions.loginUser({ email, password }));
  };

  return (
    <Dialog aria-labelledby="customized-dialog-title" open fullWidth style={{ background: 'black' }}>
      <DialogTitle
        id="customized-dialog-title"
        style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}
      >
        Login
      </DialogTitle>
      <DialogContent dividers style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
        <div style={{ marginBottom: 20 }}>
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
        <div style={{ marginBottom: 20 }}>
          <TextField
            error={password.length > 0 && password.length < 2 ? true : false}
            helperText={password.length > 0 && password.length < 2 ? 'Please, enter a password' : ''}
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
          <Typography gutterBottom style={{ color: 'red', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions style={{ background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
        <Typography variant="caption" style={{ color: 'yellow' }}>
          <Link to={RESET_PASSWORD}>Forgot Password?</Link>
        </Typography>
        <Button color="secondary" variant="contained" onClick={handleSubmit} type="submit" disabled={invalid}>
          {loading ? 'Connecting' : 'Login'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
