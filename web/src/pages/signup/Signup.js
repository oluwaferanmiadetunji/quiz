import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { styles } from './style';
import { validateData, validateEmail } from '../../utils/validateData';
import { makePostReq } from '../../utils/api';
import Toast from '../../utils/Toast';

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		textAlign: 'center',
	},
}))(MuiDialogActions);

export default () => {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const invalid = !validateData(email) || !validateData(password) || !validateEmail(email);

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// function to handle user input on email
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { status, message, data } = await makePostReq('admin/register', { email: email.trim(), password: password.trim() });
		if (status === 'ok') {
			localStorage.setItem('Token', data);
			history.push('/login');
		}
		Toast(message, status);
		setLoading(false);
	};

	return (
		<Dialog aria-labelledby='customized-dialog-title' open fullWidth style={{ background: 'black' }}>
			<DialogTitle id='customized-dialog-title' style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
				Signup
			</DialogTitle>
			<DialogContent dividers style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
				<div style={{ marginBottom: 20 }}>
					<TextField
						error={!validateData(email) | !validateEmail(email) ? true : false}
						helperText={!validateData(email) | !validateEmail(email) ? 'Please, enter a valid email' : ''}
						id='email'
						type='email'
						label='Email'
						variant='outlined'
						fullWidth
						size='small'
						InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div style={{ marginBottom: 20 }}>
					<TextField
						error={!validateData(password) ? true : false}
						helperText={!validateData(password) ? 'Please, enter a valid password' : ''}
						id='password'
						type='password'
						label='Password'
						variant='outlined'
						fullWidth
						size='small'
						InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
			</DialogContent>
			<DialogActions style={{ background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
				<Typography variant='caption' style={{ color: 'yellow' }}>
					<Link to={''}>Login?</Link>
				</Typography>
				<Typography variant='caption' style={{ color: 'yellow' }}>
					<Link to={'reset-password'}>Forgot Password?</Link>
				</Typography>
				<Button color='secondary' variant='contained' onClick={handleSubmit} type='submit' disabled={invalid}>
					{loading ? 'Connecting' : 'Signup'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
