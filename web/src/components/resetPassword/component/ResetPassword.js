/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LOGIN } from '../../../constant';
import { styles } from './style';
import { NO_USER, NO_USER_RESPONSE, SENT_MESSAGE } from './constants';
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

export const ResetPasswordForm = ({ firebase }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const invalid = email === '' || !email.trim().match(re);

  // function to handle user input on email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    firebase
      .doPasswordReset(email)
      .then((res) => {
        console.log(res);
        setEmail('');
        setMessage(SENT_MESSAGE);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === NO_USER) {
          setMessage(NO_USER_RESPONSE);
        } else {
          setMessage(err.message);
        }
        setLoading(false);
      });
  };

  return (
    <Dialog aria-labelledby="customized-dialog-title" open fullWidth style={{ background: 'black' }}>
      <DialogTitle
        id="customized-dialog-title"
        style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}
      >
        Reset Password
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
        {message && (
          <Typography gutterBottom style={{ color: 'red', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions style={{ background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
        <Typography variant="caption" style={{ color: 'yellow' }}>
          <Link to={LOGIN}>Sign In</Link>
        </Typography>
        <Button color="secondary" variant="contained" onClick={handleSubmit} type="submit" disabled={invalid}>
          {loading ? 'Connecting' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
