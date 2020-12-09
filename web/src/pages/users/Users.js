import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import { makeGetReq } from '../../utils/api';
import withLayout from '../../components/layout';
import { setTitle } from '../../components/layout/redux';
import { SET_USERS } from './redux';
import { SET_USER } from '../user/redux';

const Courses = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const users = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(setTitle('Users'));
		const getUsers = async () => {
			const { data } = await makeGetReq('users');
			dispatch({ type: SET_USERS, payload: data });
		};
		getUsers();
	}, [dispatch]);

	const getSingleUser = (id) => {
		const singleUser = [...users].find((user) => user.id === id);
		dispatch({ type: SET_USER, payload: singleUser });
		console.log(singleUser);
		history.push(`/users/${id}`);
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>S/N</StyledTableCell>
						<StyledTableCell align='right'>Name</StyledTableCell>
						<StyledTableCell align='right'>Email</StyledTableCell>
						<StyledTableCell align='right'>Status</StyledTableCell>
						<StyledTableCell align='right'>Date</StyledTableCell>
						<StyledTableCell align='right'></StyledTableCell>
					</TableRow>
				</TableHead>
				{users ? (
					<TableBody>
						{users.map(({ name, email, activated, createdAt, id }, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {name} </StyledTableCell>
								<StyledTableCell align='right'> {email} </StyledTableCell>
								<StyledTableCell align='right'> {activated ? 'Premium' : 'Free'} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										onClick={() => {
											getSingleUser(id);
										}}>
										View
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				) : (
					<div>No courses</div>
				)}
			</Table>
		</TableContainer>
	);
};

export default withLayout(Courses);
