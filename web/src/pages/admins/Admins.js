import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { SET_ADMINS } from './redux';
import { setTitle } from '../../components/layout/redux';

const Admins = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const admins = useSelector((state) => state.admins);

	useEffect(() => {
		dispatch(setTitle('Admins'));
		const getAdins = async () => {
			const { data } = await makeGetReq('admins');
			dispatch({ type: SET_ADMINS, payload: data });
		};
		getAdins();
	}, [dispatch]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>S/N</StyledTableCell>
						<StyledTableCell align='right'>Email</StyledTableCell>
						<StyledTableCell align='right'>Date</StyledTableCell>
						<StyledTableCell align='right'></StyledTableCell>
					</TableRow>
				</TableHead>
				{admins ? (
					<TableBody>
						{admins.map((adin, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {adin.data.email} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(adin.data.createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										// onClick={() => {
										// 	deleteCourse(course.key);
										// }}
										style={{ backgroundColor: 'red', color: 'white' }}>
										Delete
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				) : (
					<div>No Admins</div>
				)}
			</Table>
		</TableContainer>
	);
};

export default withLayout(Admins);
