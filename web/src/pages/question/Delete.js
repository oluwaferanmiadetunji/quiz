import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DELETE_QUESTION } from '../questions/redux';
import { makeDeleteReq } from '../../utils/api';

export default function Delete() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const singleQuestion = useSelector((state) => state.question);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteQuestion = async () => {
		setLoading(true);
		const key = singleQuestion.id;
		dispatch({ type: DELETE_QUESTION, payload: key });
		await makeDeleteReq(`questions/${key}`);
		setLoading(false);
		history.push('/questions');
	};

	return (
		<>
			<Button variant='outlined' style={{ color: 'white', background: 'red', margin: 10 }} onClick={handleClickOpen}>
				Delete
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title' style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
					{' Are you sure you want to delete this question?'}
				</DialogTitle>
				<DialogActions style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
					<Button onClick={handleClose} style={{ color: 'yellow', backgroundColor: 'black' }}>
						Cancel
					</Button>
					<Button onClick={deleteQuestion} style={{ color: 'white', backgroundColor: 'red' }} autoFocus>
						{loading ? 'Deleting' : 'Yes, Delete'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
