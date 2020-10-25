import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function Delete({ uid, firebase }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    firebase
      .user(uid)
      .remove()
      .then(() => {
        alert('Admin Deleted')
      })
      .catch(() => {
        setMessage('Error deleting Admin');
      });
    setLoading(false);
  };

  return (
    <>
      <Button variant="outlined" style={{ color: 'white', background: 'red', margin: 10 }} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}
        >
          {' Are you sure you want to delete this admin?'}
        </DialogTitle>
        {message && (
          <Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
        <DialogActions style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
          <Button onClick={handleClose} style={{ color: 'yellow', backgroundColor: 'black' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{ color: 'white', backgroundColor: 'red' }} autoFocus>
            {loading ? 'Deleting' : 'Yes, Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
