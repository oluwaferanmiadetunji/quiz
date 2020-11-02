import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import Loader from '../../components/loader';
import { makeGetReq } from '../../utils/api';
import { setCourses } from './redux';

export default function () {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState([]);

	useEffect(() => {}, []);

	return loading ? (
		<Loader />
	) : (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>S/N</StyledTableCell>
						<StyledTableCell align='right'>Course</StyledTableCell>
						<StyledTableCell align='right'>Date</StyledTableCell>
						<StyledTableCell align='right'></StyledTableCell>
					</TableRow>
				</TableHead>
				{courses ? (
					<TableBody>
						{courses.map(({ course, createdAt, uid }, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {course} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										onClick={() => {
											firebase
												.course(uid)
												.remove()
												.then(() => {})
												.catch(() => {});
										}}
										style={{ backgroundColor: 'red', color: 'white' }}>
										Delete
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
}
