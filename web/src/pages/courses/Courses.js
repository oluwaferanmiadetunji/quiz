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
import { makeGetReq, makeDeleteReq } from '../../utils/api';
import withLayout from '../../components/layout';
import { SET_COURSES, DELETE_COURSE } from './redux';
import { setTitle } from '../../components/layout/redux';

const Courses = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const courses = useSelector((state) => state.courses);

	const deleteCourse = async (key) => {
		dispatch({ type: DELETE_COURSE, payload: key });
		await makeDeleteReq(`courses/${key}`);
	};

	useEffect(() => {
		dispatch(setTitle('Courses'));
		const getCourses = async () => {
			const { data } = await makeGetReq('courses/all');
			dispatch({ type: SET_COURSES, payload: data });
		};
		getCourses();
	}, [dispatch]);

	return (
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
						{courses.map((course, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {course.data.course} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(course.data.createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										onClick={() => {
											deleteCourse(course.key);
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
};

export default withLayout(Courses);
