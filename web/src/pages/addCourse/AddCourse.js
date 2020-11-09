import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withLayout from '../../components/layout';
import { setTitle } from '../../components/layout/redux';
import { validateData } from '../../utils/validateData';
import { makePostReq } from '../../utils/api';
import Toast from '../../utils/Toast';
import { addCourse } from '../courses/redux';

const AddAdmin = () => {
	const dispatch = useDispatch();
	const classes = Styles();
	const [course, setCourse] = useState('');
	const [loading, setLoading] = useState(false);

	const invalid = !validateData(course);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { status, message, data } = await makePostReq('courses', { course: course.trim() });
		if (data) dispatch(addCourse(data));
		Toast(message, status);
		setLoading(false);
		setCourse('');
	};

	useEffect(() => {
		dispatch(setTitle('Add Course'));
	}, [dispatch]);

	return (
		<div className={classes.root}>
			<Typography variant='h6'>Add Course</Typography>
			<form className={classes.root} noValidate autoComplete='off'>
				<div className={classes.formField}>
					<TextField
						error={!validateData(course) ? true : false}
						helperText={!validateData(course) ? 'Please, enter a course' : ''}
						id='course'
						type='text'
						label='Course'
						variant='outlined'
						fullWidth
						size='small'
						InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						value={course}
						onChange={(event) => setCourse(event.target.value)}
					/>
				</div>

				<Button style={{ background: '#000', color: 'yellow' }} variant='contained' onClick={handleSubmit} type='submit' disabled={invalid}>
					{loading ? 'Connecting' : 'Add'}
				</Button>
			</form>
		</div>
	);
};

export default withLayout(AddAdmin);
