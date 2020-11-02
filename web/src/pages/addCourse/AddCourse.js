import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withLayout from '../../components/layout';
import { setTitle } from '../../components/layout/redux';
import { validateData, validateEmail, validatePassword } from '../../utils/validateData';
import { makePostReq } from '../../utils/api';
import Toast from '../../utils/Toast';

const AddAdmin = () => {
	const dispatch = useDispatch();
	dispatch(setTitle('Add Course'));
	const classes = Styles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const invalid = !validateData(email) || !validateData(password) || !validateEmail(email);

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const message = useSelector((state) => state.addAdminMessage);

	// function to handle user input on email
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { status, message } = await makePostReq('admin/register', { email: email.trim(), password: password.trim() });

		Toast(message, status);
		setLoading(false);
	};

	const passwordHelperText = () => {
		if (!validateData(password)) {
			return 'Please, enter a valid password';
		} else if (!validatePassword(password)) {
			return 'Password must be greater than 6 characters';
		} else {
			return '';
		}
	};

	return (
		<div className={classes.root}>
			<Typography variant='h6'>Add Admin</Typography>
			<form className={classes.root} noValidate autoComplete='off'>
				<div className={classes.formField}>
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
				<div className={classes.formField}>
					<TextField
						error={!validateData(password) | !validatePassword(password) ? true : false}
						helperText={passwordHelperText()}
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

				{message && (
					<Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
						{message}
					</Typography>
				)}
				<Button style={{ background: '#000', color: 'yellow' }} variant='contained' onClick={handleSubmit} type='submit' disabled={invalid}>
					{loading ? 'Connecting' : 'Add'}
				</Button>
			</form>
		</div>
	);
};

export default withLayout(AddAdmin);
